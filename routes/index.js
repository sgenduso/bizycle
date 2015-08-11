var express = require('express');
var router = express.Router();
var Job = require('./../mongoose/jobModel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorado Bikes + Biz + Beer' });
});

router.get('/jobs', function(req, res, next) {
  res.render('jobs', { title: 'JOB BOARD' });
});

router.get('/newjob', function (req, res, next) {
  res.render('job/newjob');
});

router.post('/newjob', function (req, res, next) {
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
  });
});


module.exports = router;
