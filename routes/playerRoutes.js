import express from 'express';
import multer from 'multer';
import Player from '../models/player.js';
import twilio from 'twilio';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Twilio setup
const router = express.Router();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// File upload config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST: Add new player
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const photo = req.file ? req.file.filename : '';

    if (!photo) {
      return res.status(400).json({ error: "Photo is required" });
    }

    const player = new Player({ name, role, phone, photo });
    await player.save();

    // Send SMS
    await twilioClient.messages.create({
      body: `🎉 Hello ${name}! You have been added to the team as ${role}. Match info will be updated soon!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.status(201).json({ message: "✅ Player added and SMS sent", player });
  } catch (err) {
    console.error("❌ Error adding player:", err);
    res.status(500).json({ error: "Error adding player" });
  }
});

// GET: All players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

export default router;
