const express = require('express');
const router = express.Router();
const authenticate = require('../config/auth');

// User model
const User = require("../models/user");

// GET home page
router.get('/', (req, res, next) => {
  res.render('pages/home', {
    title: 'MHD App'
  });
});

// GET Dashboard page
router.get('/dashboard', authenticate, (req, res, next) => {
  res.render('pages/dashboard', {
    title: 'Dashboard',
    firstName: req.user.firstName,
  });
});

// GET User Information for Dashboard
router.get('/dashboard/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(doc => {
      console.log('From Database', doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;