const Court = require('../models/Court');
const { Coach } = require('../models/Resource');
const PricingRule = require('../models/PricingRule');

// 1. Manage Courts
const getCourts = async (req, res) => {
  const courts = await Court.find();
  res.json(courts);
};

const updateCourtPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { basePrice } = req.body;
    await Court.findByIdAndUpdate(id, { basePrice });
    res.json({ message: 'Price updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Manage Coaches
const getCoaches = async (req, res) => {
  const coaches = await Coach.find();
  res.json(coaches);
};

const toggleCoachStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    await Coach.findByIdAndUpdate(id, { isAvailable });
    res.json({ message: 'Coach status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Manage Rules
const addPricingRule = async (req, res) => {
  try {
    const rule = await PricingRule.create(req.body);
    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getCourts, updateCourtPrice, 
  getCoaches, toggleCoachStatus, 
  addPricingRule 
};