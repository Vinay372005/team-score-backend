import express from 'express';
import Score from '../models/score.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

router.post('/', async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

export default router;
