const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticate = require('../config/auth');

// User model
const User = require("../models/user");
const user = require('../models/user');

// GET home page
router.get('/', (req, res, next) => {
  res.render('pages/home', {
    title: 'MHD App'
  });
});

// GET Dashboard page
router.get('/dashboard', authenticate, (req, res, next) => {
  if (req.cookies.user_sid && !req.session.passport.user) {
    res.clearCookie("user_sid");
  };
  res.render('pages/dashboard', {
    title: 'Dashboard',
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    userName: req.user.userName,
    password: req.user.password,
    gender: req.user.gender,
    phoneNumber: req.user.phoneNumber,
    bio: req.user.bio,
    avatar: req.user.avatar
  });
  console.log("cookie: ", req.cookies.user_sid);
  console.log("session: ", req.session.passport.user);
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

// Config storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const uploadAvatar = multer({
  storage: storage
});

// Handle avatar upload
router.post('/uploadAvatar', authenticate, (req, res) => {
  const upload = uploadAvatar.single('avatar');

  upload(req, res, (err) => {
    if (err) return res.status(400).send('err');
    User.findById(req.session.passport.user, (err, user) => {
      if (user.avatar) {
        console.log('exist avatar:', user.avatar);
        fs.unlinkSync(`public/images/${user.avatar}`);
      };
    });
    User.findByIdAndUpdate(req.session.passport.user, {
      avatar: req.file.filename
    }, {
      new: true
    }, (err, user) => {
      if (err) return res.status(400).send('err 1');
      req.session.passport.user.avatar = req.file.filename;
    });
    User.findById(req.session.passport.user, (err, user) => {
      res.json(user);
      console.log(user.avatar);
    });
  })
})

module.exports = router;