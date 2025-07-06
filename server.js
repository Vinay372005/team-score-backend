const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const playerRoutes = require("./routes/playerRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/players", playerRoutes);
app.use("/api/scores", scoreRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
