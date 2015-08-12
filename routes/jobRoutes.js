var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');
var databaseQueries = require('../lib/database.js');

router.get('/newjob', function (req, res, next) {
  res.render('job/newjob');
});

router.post('/newjob', function (req, res, next) {
  var errorCheck = validate.validate(req.body.title, req.body.company, req.body.location, req.body.description, req.body.expiry);
  if(errorCheck.length > 0){
    res.render('newjob', {errors: errorCheck});
  } else {
    databaseQueries.newJobs(req.body)
  .then(function () {
    res.redirect('/jobs');
  });
  }
});


module.exports = router;
