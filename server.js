const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection using DB_URI
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/scores', scoreRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🏏 Team Score Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
