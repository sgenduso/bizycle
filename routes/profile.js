var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');
var databaseQueries = require('../lib/database.js')

router.get('/profile', function (req, res, next) {
  res.render('profile')
})


module.exports = router;
