var express = require('express');
var router = express.Router();
var validate = require('../public/validate.js')

var db = require('../models');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorado Bikes + Biz + Beer' });
});

router.get('/jobs', function(req, res, next) {
  db.Job.find({}, function (err, jobs) {
    console.log(jobs);
  });
  // req.session.user = "akhil";
  // req.session.otherCookie = "sankar";
  console.log(res.locals);
  if (req.session.user) {
    res.render('jobs', { title: 'JOB BOARD', loggedIn: true });

  } else {
    res.render('jobs', { title: 'JOB BOARD'});
  }
});

router.post('/signup', function (req, res, next) {

});

router.get('/newjob', function (req, res, next) {
  res.render('job/newjob');
});

router.post('/newjob', function (req, res, next) {
  var errorCheck = validate(req.body.title, req.body.company, req.body.location, req.body.description, req.body.expiry)
  if(errorCheck.length > 0){
    res.render('newjob', {errors: errorCheck})
  } else {
  Job.create(
    {
      jobTitle: req.body.title,
      companyName: req.body.company,
      location: req.body.location,
      datePosted: new Date(),
      expiryDate: req.body.expiry,
      contactInfo: Object,
      description: req.body.description,
      requirements: req.body.requirements,
      source: req.body.source
    },
    function(err, job){
      if(err){
        console.log(err);
      } else {
        console.log(job);
      }
    }
  ).then(function () {
    res.redirect('/jobs');
  }
  });
});


module.exports = router;
