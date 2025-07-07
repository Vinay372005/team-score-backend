import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
