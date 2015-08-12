var express = require('express');
var router = express.Router();

var db = require('../models');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorado Bikes + Biz + Beer' });
});

module.exports = router;
