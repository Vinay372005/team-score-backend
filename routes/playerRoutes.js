// routes/playerRoutes.js
import express from 'express';
import multer from 'multer';
import Player from '../models/Player.js';
import { sendSMS } from '../utils/smsSender.js';

const router = express.Router();

// Photo upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Add new player
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const photo = req.file?.path;
    if (!photo) return res.status(400).json({ error: 'Photo is required' });

    const newPlayer = new Player({ name, role, phone, photo });
    await newPlayer.save();

    // Send SMS
    await sendSMS(phone, `🎉 You have been added to the team as ${role}. Stay ready!`);

    res.status(201).json({ message: 'Player added and SMS sent' });
  } catch (err) {
    console.error("❌ Error adding player:", err);
    res.status(500).json({ error: 'Failed to add player' });
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// Delete player (admin only)
router.delete('/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete player' });
  }
});

export default router;
