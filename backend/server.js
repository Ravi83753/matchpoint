const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); // Import helmet
const connectDB = require('./config/db');

// Route Imports
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Court = require('./models/Court');

dotenv.config();
connectDB();

const app = express();

// 1. SECURITY CONFIGURATION (Fixes the Font Error)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Allow scripts
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allow Google Fonts CSS
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"], // Allow Google Fonts & Data URIs
        imgSrc: ["'self'", "data:", "https:"], // Allow external images (Unsplash/Pexels)
        connectSrc: ["'self'", process.env.FRONTEND_URL || "*"], // Allow API calls
      },
    },
  })
);

app.use(cors());
app.use(express.json());

// 2. Simple Court Route
app.get('/api/courts', async (req, res) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));