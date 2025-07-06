const express = require("express");
const router = express.Router();
const Score = require("../models/score");

router.get("/", async (req, res) => {
  const score = await Score.findOne().sort({ _id: -1 });
  res.json(score);
});

router.post("/", async (req, res) => {
  const { password, runs, wickets, overs, status } = req.body;
  if (password !== process.env.ADMIN_PASS) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const newScore = new Score({ runs, wickets, overs, status });
  await newScore.save();
  res.status(200).json(newScore);
});

module.exports = router;
