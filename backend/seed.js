const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Models
const Court = require('./models/Court');
const { Coach, Equipment } = require('./models/Resource');
const PricingRule = require('./models/PricingRule');

dotenv.config();
connectDB();

// FINAL IMAGE SET
const COURT_IMAGES = [
  // 1. Indoor (Green)
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
  
  // 2. Indoor (Wood)
  'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=800&q=80',
  
  // 3. Outdoor (Grass) - PEXELS (Working)
  'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',

  // 4. Outdoor (Street Court) - NEW PEXELS LINK
  // A clear shot of a badminton racket outdoors
  'https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const importData = async () => {
  try {
    // 1. Clear existing data
    await Court.deleteMany();
    await Coach.deleteMany();
    await Equipment.deleteMany();
    await PricingRule.deleteMany();

    console.log('Data Destroyed... (Cleaning up)');

    // 2. Insert Courts (Requirement: 2 Indoor, 2 Outdoor)
    await Court.insertMany([
      { name: 'Arena Pro (Indoor)', type: 'indoor', basePrice: 150, image: COURT_IMAGES[0] },
      { name: 'Classic Wood (Indoor)', type: 'indoor', basePrice: 120, image: COURT_IMAGES[1] },
      { name: 'Garden Court (Outdoor)', type: 'outdoor', basePrice: 70, image: COURT_IMAGES[2] },
      { name: 'Street Court (Outdoor)', type: 'outdoor', basePrice: 60, image: COURT_IMAGES[3] },
    ]);

    // 3. Insert Resources (Requirement: 3 Coaches)
    await Coach.insertMany([
      { name: 'Coach John', specialization: 'Attack Strategy', hourlyRate: 200, isAvailable: true },
      { name: 'Coach Sarah', specialization: 'Defense & Footwork', hourlyRate: 250, isAvailable: true },
      { name: 'Coach Mike', specialization: 'Beginner Training', hourlyRate: 150, isAvailable: true },
    ]);

    // Equipment
    await Equipment.insertMany([
      { name: 'Yonex Astrox 99', totalStock: 10, pricePerUnit: 50 },
      { name: 'Nylon Shuttles (Pack)', totalStock: 50, pricePerUnit: 20 },
      { name: 'Court Shoes (Rental)', totalStock: 20, pricePerUnit: 30 }
    ]);

    // 4. Insert Rules
    await PricingRule.insertMany([
      { name: 'Weekend Surge', type: 'multiplier', value: 1.5, conditions: { days: [0, 6] } },
      { name: 'Evening Peak Hour', type: 'markup', value: 50, conditions: { startTime: '18:00', endTime: '21:00' } }
    ]);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();