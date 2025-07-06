// routes/playerRoutes.js
import express from 'express';
import multer from 'multer';
import Player from '../models/player.js';

const router = express.Router();

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// ✅ Route to add player with image
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, role, phone } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newPlayer = new Player({ name, role, phone, image });
    await newPlayer.save();
    res.status(201).json({ message: 'Player added!', player: newPlayer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving player' });
  }
});

export default router;
