import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  runs: {
    type: Number,
    required: true,
    default: 0
  },
  overs: {
    type: Number,
    required: true,
    default: 0
  },
  batsman: {
    type: String,
    default: ''
  },
  bowler: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Not Started' // Options: Not Started, Live, Finished
  }
});

export default mongoose.model('Score', scoreSchema);
