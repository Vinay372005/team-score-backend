import express from 'express';
import Score from '../models/score.js';

const router = express.Router();

// GET: Get current score
router.get('/', async (req, res) => {
  try {
    let score = await Score.findOne();
    if (!score) {
      score = new Score();
      await score.save();
    }
    res.json(score);
  } catch (err) {
    console.error("❌ Error fetching score:", err);
    res.status(500).json({ error: 'Failed to get score' });
  }
});

// POST: Update score
router.post('/', async (req, res) => {
  try {
    const { runs, overs } = req.body;

    let score = await Score.findOne();
    if (!score) {
      score = new Score({ runs, overs });
    } else {
      score.runs = runs;
      score.overs = overs;
    }

    await score.save();
    res.json({ message: '✅ Score updated successfully' });
  } catch (err) {
    console.error("❌ Error updating score:", err);
    res.status(500).json({ error: 'Failed to update score' });
  }
});

export default router;
