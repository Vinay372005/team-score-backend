import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import playerRoutes from './routes/playerRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/players', playerRoutes);
app.use('/api/scores', scoreRoutes);

// MongoDB connection
console.log("🔍 Connecting to MongoDB:", process.env.DB_URI);  // For debug
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/scores', scoreRoutes);

// Test route
app.get('/', (req, res) => {
  res.send("✅ Team Score Backend is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
