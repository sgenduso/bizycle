var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');

var databaseQueries = require('../lib/database.js');

router.use('/newjob', function (req,res, next) {
  if(req.session.userId){
    next()
  } else {
    res.redirect('/jobs')
  }
})

router.get('/newjob', function (req, res, next) {
  res.render('job/newjob');
});

router.post('/newjob', function (req, res, next) {
  var errorCheck = validate.validate(req.body.title, req.body.company, req.body.location, req.body.description, req.body.expiry);
  var userId = req.session.userId;
  if(errorCheck.length > 0){
    res.render('newjob', {errors: errorCheck});
  } else {
    console.log(req.body, "req body before conversion");
    // req.body.activate = timestampToDate(req.body.activate);
    // req.body.expiry = timestampToDate(req.body.expiry);
    console.log(req.body, "req body inserted");
    databaseQueries.newJobs(userId, req.body)
  .then(function () {
    res.redirect('/jobs');
  });
  }
});

module.exports = router;
