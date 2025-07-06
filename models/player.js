
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  phone: String,
  image: String 
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
