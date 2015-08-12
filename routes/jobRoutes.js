var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js')


var db = require('../models');

router.get('/newjob', function (req, res, next) {
  res.render('job/newjob');
});

router.post('/newjob', function (req, res, next) {
  var errorCheck = validate.validate(req.body.title, req.body.company, req.body.location, req.body.description, req.body.expiry)
  if(errorCheck.length > 0){
    res.render('newjob', {errors: errorCheck})
  } else {
  db.Job.create(
    {
      jobTitle: req.body.title,
      companyName: req.body.company,
      location: req.body.location,
      activationDate: req.body.activate,
      expiryDate: req.body.expiry,
      contactInfo: req.body.contact,
      description: req.body.description,
      requirements: req.body.requirements,
      source: req.body.source
    },
    function(err, job){
      if(err){
        // console.log(err);
      } else {
        // console.log(job);
      }
    }
  ).then(function () {
    res.redirect('/jobs');
  });
  }
});


module.exports = router;
