const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', { errors, email, password, password2 });
  } else {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.render('signup', { errors, email, password, password2 });
      } else {
        const newUser = new User({ email, password });
        await newUser.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/users/login');
      }
    } catch (err) {
      console.error(err);
      res.render('signup', { errors: [{ msg: 'An error occurred' }], email, password, password2 });
    }
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

module.exports = router;

