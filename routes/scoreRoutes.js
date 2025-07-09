// routes/scoreRoutes.js
import express from 'express';
import Score from '../models/Score.js';
import { sendBulkSMS } from '../utils/smsSender.js';
import Player from '../models/Player.js';

const router = express.Router();

// Get live score
router.get('/', async (req, res) => {
  try {
    const score = await Score.findOne();
    if (!score) return res.json({});
    res.json(score);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
});

// Update live score (Admin only)
router.put('/', async (req, res) => {
  const { runs, wickets, overs, batsman, bowler, status } = req.body;
  try {
    const score = await Score.findOneAndUpdate(
      {},
      { runs, wickets, overs, batsman, bowler, status },
      { upsert: true, new: true }
    );

    res.json(score);
  } catch (err) {
    console.error("❌ Error updating score:", err);
    res.status(500).json({ error: 'Failed to update score' });
  }
});

// Send SMS when innings starts or ends
router.post('/notify', async (req, res) => {
  const { message } = req.body;
  try {
    const players = await Player.find();
    const numbers = players.map(p => p.phone);
    await sendBulkSMS(numbers, message);
    res.json({ message: 'SMS sent to all players' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

export default router;
