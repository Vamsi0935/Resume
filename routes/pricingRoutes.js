// routes/pricingRoutes.js
const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');

router.post('/', async (req, res) => {
  const { plan, cardNumber, expiryDate, cvv } = req.body;
  if (!plan || !cardNumber || !expiryDate || !cvv) return res.status(400).json({ message: 'All fields are required' });
  try {
    const pricing = new Pricing({ plan, cardNumber, expiryDate, cvv });
    await pricing.save();
    res.status(201).json({ message: 'Pricing saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving pricing', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const pricingPlans = await Pricing.find();
    res.status(200).json(pricingPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pricing plans', error });
  }
});

module.exports = router;
