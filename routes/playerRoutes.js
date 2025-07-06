const express = require("express");
const router = express.Router();
const Player = require("../models/player");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const twilio = require("twilio");

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, async (err, result) => {
      if (err) return res.status(500).send("Upload failed");

      const newPlayer = new Player({ name, role, phone, photoURL: result.secure_url });
      await newPlayer.save();

      await client.messages.create({
        body: `Hi ${name}, you’ve been added to the team! Stay ready for the next match.`,
        from: process.env.TWILIO_PHONE,
        to: phone
      });

      res.status(200).json(newPlayer);
    });

    req.file.stream.pipe(result);
  } catch (err) {
    res.status(500).send("Error saving player");
  }
});

router.get("/", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

module.exports = router;
