const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Hisaab = require('../models/hisaabModel');

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const hisaabEntries = await Hisaab.find({ user: req.user.id }).sort({ date: -1 });
    res.render('dashboard', { user: req.user, hisaabEntries });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching your hisaab');
    res.render('dashboard', { user: req.user, hisaabEntries: [] });
  }
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('addHisaab');
});

router.post('/add', ensureAuthenticated, async (req, res) => {
  const { amount, description, isEncrypted } = req.body;
  try {
    const newHisaab = new Hisaab({
      user: req.user.id,
      amount,
      description,
      isEncrypted: isEncrypted === 'on'
    });
    await newHisaab.save();
    req.flash('success_msg', 'New hisaab entry added');
    res.redirect('/hisaab');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while adding the hisaab entry');
    res.redirect('/hisaab/add');
  }
});

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const hisaab = await Hisaab.findOne({ _id: req.params.id, user: req.user.id });
    if (!hisaab) {
      req.flash('error_msg', 'Hisaab entry not found');
      return res.redirect('/hisaab');
    }
    res.render('editHisaab', { hisaab });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred');
    res.redirect('/hisaab');
  }
});

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
  const { amount, description, isEncrypted } = req.body;
  try {
    await Hisaab.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { amount, description, isEncrypted: isEncrypted === 'on' }
    );
    req.flash('success_msg', 'Hisaab entry updated');
    res.redirect('/hisaab');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while updating the hisaab entry');
    res.redirect(`/hisaab/edit/${req.params.id}`);
  }
});

router.get('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Hisaab.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    req.flash('success_msg', 'Hisaab entry deleted');
    res.redirect('/hisaab');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while deleting the hisaab entry');
    res.redirect('/hisaab');
  }
});

module.exports = router;

