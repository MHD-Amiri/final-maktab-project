const express = require('express');
const router = express.Router();
const authenticate = require('../config/auth');
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
})

module.exports = router;