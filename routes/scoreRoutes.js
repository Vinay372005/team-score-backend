// routes/scoreRoutes.js
import express from 'express';

const router = express.Router();

// Example: POST score
router.post('/api/scores', async (req, res) => {
  const { runs, wickets, overs } = req.body;

  try {
    // You can store this in a database if needed
    res.status(200).json({ message: "Score updated", runs, wickets, overs });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
