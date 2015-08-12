var express = require('express');
var router = express.Router();

var db = require('../models')

router.get('/newjob', function (req, res, next) {
  res.render('job/newjob');
});

router.post('/newjob', function (req, res, next) {
  db.Job.create(
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
