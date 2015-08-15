var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');
var databaseQueries = require('../lib/database.js')

router.get('/profile', function (req, res, next) {
  var userCookie = req.session.userId;
  databaseQueries.populateProfile(userCookie)
  .then(function (postedJobs) {
    res.render('profile', {jobs: postedJobs})
  })
})

router.get('/job/:id/edit', function (req, res, next) {
  databaseQueries.findOneJob(req.params.id).then(function (job) {
    res.render('job/edit', {job: job})

  })
})

router.post('/job/:id/edit', function (req, res, next) {
  databaseQueries.updateJob(req.params.id, req.body)
  .then(function () {
    res.redirect('/profile')
  });
})

router.get('/job/:id/delete', function (req, res, next) {
  databaseQueries.deleteJob(req.params.id)
  .then(function () {
    console.log("deleted sucessfully");
    res.redirect('/profile');
  })
})

router.get('/profile/:id/delete', function (req, res, next) {
  databaseQueries.deleteUser(req.params.id)
  .then(function () {
    req.session = null;
    res.redirect('/');
  })
})

module.exports = router;
