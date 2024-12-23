require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport config
require('./config/passport')(passport);

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/hisaab', require('./routes/hisaab'));

// Vercel serverless function handler
if (process.env.VERCEL) {
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    next();
  });
}

const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, console.log(`Server running on port ${PORT}`));
}

module.exports = app;

