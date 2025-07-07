import express from 'express';
import multer from 'multer';
import Player from '../models/player.js';
import sendSMS from '../utils/sendSMS.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// POST: Add new player
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const photoPath = req.file ? req.file.path : '';

    const player = new Player({ name, role, phone, photo: photoPath });
    await player.save();

    if (phone) {
      await sendSMS(phone, `Hi ${name}, you are added to the team as ${role}!`);
    }

    res.status(201).json({ message: 'Player added successfully' });
  } catch (err) {
    console.error("❌ Error adding player:", err);
    res.status(500).json({ error: 'Failed to add player' });
  }
});

// GET: Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    console.error("❌ Error fetching players:", err);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

export default router;
