const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Hisaab = require('../models/hisaabModel');

router.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const hisaabEntries = await Hisaab.find({ user: req.user.id }).sort({ date: -1 });
    res.render('dashboard', { user: req.user, hisaabEntries });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching your hisaab');
    res.render('dashboard', { user: req.user, hisaabEntries: [] });
  }
});

module.exports = router;

