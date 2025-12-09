const Booking = require('../models/Booking');
const Court = require('../models/Court');
const { calculateDynamicPrice } = require('../utils/priceCalculator');
// @desc    Check if a booking is possible
// @access  Internal Helper Function (Not a route)
const checkAvailability = async (courtId, startTime, endTime) => {
  // Overlap Logic:
  // A booking overlaps if:
  // (NewStart < ExistingEnd) AND (NewEnd > ExistingStart)
  const existingBooking = await Booking.findOne({
    court: courtId,
    status: 'confirmed',
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });

  return !existingBooking; // Returns true if NO booking found (Available)
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { userId, courtId, startTime, endTime, resources } = req.body;

    // 1. Convert strings to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // 2. CHECK AVAILABILITY (The Critical Step)
    const isCourtAvailable = await checkAvailability(courtId, start, end);

    if (!isCourtAvailable) {
      return res.status(400).json({ 
        message: '❌ Court is already booked for this time slot.' 
      });
    }

    // 3. Calculate Dynamic Price
const court = await Court.findById(courtId);
if (!court) return res.status(404).json({ message: 'Court not found' });

// Calculate base court price with rules (Weekend/Peak)
let totalPrice = await calculateDynamicPrice(court, start, end);

// Add Resource Costs (Coach/Equipment)
if (resources && resources.length > 0) {
  for (const item of resources) {
    // You would fetch the real price from DB here, simplified for now:
    // assuming fixed $50 for items for this specific step to keep it running
    totalPrice += (50 * item.quantity); 
  }
}

    // 4. Create the Booking
    const newBooking = await Booking.create({
      user: userId,
      court: courtId,
      startTime: start,
      endTime: end,
      totalPrice: totalPrice,
      status: 'confirmed',
      equipment: resources || [] 
    });

    res.status(201).json(newBooking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createBooking };