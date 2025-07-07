import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  runs: {
    type: Number,
    default: 0,
  },
  overs: {
    type: String,
    default: '0.0',
  },
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
