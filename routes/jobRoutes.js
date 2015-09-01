var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');

var databaseQueries = require('../lib/database.js');

router.use('/newjob', function (req,res, next) {
  if(req.session.userId){
    next()
  } else {
    res.redirect('jobs/alljobs')
  }
})

router.get('/newjob', function (req, res, next) {
  res.render('jobs/newjob');
});

router.post('/newjob', function (req, res, next) {
  var errorCheck = validate(req.body.title, req.body.company, req.body.location, req.body.description, req.body.expiry);
  // console.log(errorCheck, "ERRORS");
  var userId = req.session.userId;
  if(errorCheck.length > 0){
    res.render('jobs/newjob', {errors: errorCheck});
  } else {
    databaseQueries.newJobs(userId, req.body)
  .then(function (data) {
    console.log(data, "RETURN");
    res.redirect('/jobs/alljobs');
  });
  }
});

module.exports = router;
