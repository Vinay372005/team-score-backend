// models/Player.js
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: true } // path to uploaded image
});

export default mongoose.model('Player', playerSchema);
