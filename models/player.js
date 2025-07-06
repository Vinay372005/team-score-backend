const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
  role: String,
  phone: String,
  photoURL: String
});

module.exports = mongoose.model("Player", PlayerSchema);
