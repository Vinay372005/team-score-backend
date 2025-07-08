import express from 'express';
import Score from '../models/score.js';
import Player from '../models/player.js';
import twilio from 'twilio';

const router = express.Router();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// GET: Current score
router.get('/', async (req, res) => {
  try {
    let score = await Score.findOne();
    if (!score) {
      score = new Score();
      await score.save();
    }
    res.json(score);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch score" });
  }
});

// POST: Update score
router.post('/', async (req, res) => {
  try {
    const { runs, overs, batsman, bowler, status } = req.body;

    let score = await Score.findOne();
    if (!score) {
      score = new Score();
    }

    const isInningsStart = score.status !== 'Live' && status === 'Live';
    const isInningsEnd = score.status === 'Live' && status === 'Finished';

    score.runs = runs;
    score.overs = overs;
    score.batsman = batsman;
    score.bowler = bowler;
    score.status = status;
    await score.save();

    // SMS Notification
    if (isInningsStart || isInningsEnd) {
      const players = await Player.find();
      const message = isInningsStart
        ? `🏏 Innings has started! Stay tuned for updates.\nScore: ${runs}/${overs}`
        : `🔚 Innings has ended!\nFinal Score: ${runs}/${overs}`;

      for (let player of players) {
        await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: player.phone
        });
      }
    }

    res.json({ message: "✅ Score updated", score });
  } catch (err) {
    console.error("❌ Error updating score:", err);
    res.status(500).json({ error: "Failed to update score" });
  }
});

export default router;
