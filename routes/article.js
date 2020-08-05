const express = require('express');
const router = express.Router();
const authenticate = require('../config/auth');

// User model
const User = require("../models/article");

// GET Article page
router.get('/', authenticate, (req, res, next) => {
  if (req.cookies.user_sid && !req.session.passport.user) {
    res.clearCookie("user_sid");
  };
  res.render('pages/article', {
    title: 'New Article',
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    userName: req.user.userName,
    gender: req.user.gender,
    phoneNumber: req.user.phoneNumber,
    bio: req.user.bio
  });
});

module.exports = router;