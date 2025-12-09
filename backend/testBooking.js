const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Court = require('./models/Court');
const User = require('./models/User'); 

dotenv.config();

const makeBooking = async (userId, courtId, startTime, endTime) => {
  const url = 'http://localhost:5000/api/bookings';
  const body = {
    userId,
    courtId,
    startTime,
    endTime
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    
    if (response.ok) {
      console.log(`Success: Booking confirmed! (ID: ${data._id})`);
    } else {
      console.log(`Failed: ${data.message}`);
    }
  } catch (error) {
    console.log('Error hitting server:', error.message);
  }
};

const runTest = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  let user = await User.findOne();
  if (!user) {
    user = await User.create({ name: 'Test User', email: 'test@example.com', password: '123' });
  }
  
  const court = await Court.findOne({ name: 'Court A' });

  if (!court) {
    console.log("⚠️ No courts found. Did you run seed.js?");
    process.exit();
  }

  console.log(`\n--- TEST STARTING ---`);
  console.log(`User: ${user.name} | Court: ${court.name}`);

  const startTime = new Date();
  startTime.setHours(10, 0, 0, 0);
  
  const endTime = new Date(startTime);
  endTime.setHours(11, 0, 0, 0);
  console.log(`\n1️⃣ Attempting First Booking (10:00 - 11:00)...`);
  await makeBooking(user._id, court._id, startTime, endTime);
  console.log(`\n2️⃣ Attempting Duplicate Booking (10:00 - 11:00)...`);
  await makeBooking(user._id, court._id, startTime, endTime);

  console.log(`\n--- TEST FINISHED ---`);
  process.exit();
};

runTest();