// models/Score.js
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  runs: { type: Number, required: true, default: 0 },
  wickets: { type: Number, required: true, default: 0 },
  overs: { type: String, required: true, default: "0.0" },
  batsman: { type: String, default: "" },
  bowler: { type: String, default: "" },
  status: { type: String, default: "In Progress" }
});

export default mongoose.model('Score', scoreSchema);
