const express = require('express');
const router = express.Router();
const { 
  getCourts, updateCourtPrice, 
  getCoaches, toggleCoachStatus, 
  addPricingRule 
} = require('../controllers/adminController');

// Court Routes
router.get('/courts', getCourts);
router.put('/courts/:id', updateCourtPrice);

// Coach Routes
router.get('/coaches', getCoaches);
router.put('/coaches/:id', toggleCoachStatus);

// Rule Routes
router.post('/rules', addPricingRule);

module.exports = router;