const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = {
  name: 'session_askarya',
  secret: process.env.SESSION_SECRETKEY,
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 Days
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
};