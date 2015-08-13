var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');
var databaseQueries = require('../lib/database.js')

router.get('/profile', function (req, res, next) {
  var userCookie = req.session.userId;
  databaseQueries.populateProfile(userCookie)
  .then(function (postedJobs) {
    console.log(postedJobs, "POSTED");
    res.render('profile', {jobs: postedJobs})
  })
})

router.get('/job/:id/edit', function (req, res, next) {
  databaseQueries.findOneJob(req.params.id).then(function (job) {
    console.log(job.activationDate, "activation date");
    console.log(job, "THIS IS A JOB");
    res.render('job/edit', {job: job})

  })
})

module.exports = router;
