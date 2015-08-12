var express = require('express');
var router = express.Router();

var db = require('../models');

router.get('/jobs', function(req, res, next) {
  db.Job.find({}, function (err, jobs) {
    console.log(jobs);
  });
  if (req.session.user) {
    res.render('jobs', { title: 'JOB BOARD', loggedIn: true });

  } else {
    res.render('jobs', { title: 'JOB BOARD'});
  }
});

router.post('/signup', function (req, res, next) {
});



module.exports = router;
