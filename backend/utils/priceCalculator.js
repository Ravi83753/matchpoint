const PricingRule = require('../models/PricingRule');

const calculateDynamicPrice = async (court, startTime, endTime) => {
  // 1. Get Duration in Hours
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationHours = (end - start) / (1000 * 60 * 60);

  let finalPrice = court.basePrice * durationHours;

  // 2. Fetch Active Rules
  const rules = await PricingRule.find();
  
  const dayOfWeek = start.getDay(); // 0 = Sunday, 6 = Saturday
  const startHour = start.getHours();

  // 3. Apply Rules
  for (const rule of rules) {
    let isMatch = false;

    // Condition A: Weekend Check
    if (rule.conditions.days && rule.conditions.days.includes(dayOfWeek)) {
      isMatch = true;
    }

    // Condition B: Peak Hour Check (Simple overlap check)
    // If rule is 18:00-21:00, and booking is at 19:00
    if (rule.conditions.startTime && rule.conditions.endTime) {
      const ruleStart = parseInt(rule.conditions.startTime.split(':')[0]);
      const ruleEnd = parseInt(rule.conditions.endTime.split(':')[0]);
      
      if (startHour >= ruleStart && startHour < ruleEnd) {
        isMatch = true;
      }
    }

    // Apply the math
    if (isMatch) {
      if (rule.type === 'multiplier') {
        finalPrice *= rule.value; // e.g., 100 * 1.5 = 150
      } else if (rule.type === 'markup') {
        finalPrice += rule.value; // e.g., 100 + 50 = 150
      }
    }
  }

  return finalPrice;
};

module.exports = { calculateDynamicPrice };