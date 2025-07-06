const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  runs: Number,
  wickets: Number,
  overs: String,
  status: String
});

module.exports = mongoose.model("Score", ScoreSchema);
