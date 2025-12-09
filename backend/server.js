const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Court = require('./models/Court');

dotenv.config();
connectDB();

const app = express();

// 1. ALLOW ALL TRAFFIC (CORS) - Solves connection issues
app.use(cors({
  origin: '*', // Allow Vercel, Localhost, or any other frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. ROOT ROUTE (Fixes the 404 Error)
// This lets you open the API link in your browser and see a success message
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// 3. API Routes
app.get('/api/courts', async (req, res) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));