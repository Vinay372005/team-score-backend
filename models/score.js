import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  runs: Number,
  wickets: Number,
  overs: Number,
  opponent: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Score', scoreSchema);
