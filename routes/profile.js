var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');
var databaseQueries = require('../lib/database.js');

router.use(function (req, res, next) {
  if(req.session.userId) {
    next();
  }
  else {
    res.redirect('/');
  }
});

router.get('/profile', function (req, res, next) {
  var userCookie = req.session.userId;
  databaseQueries.populateProfile(userCookie)
  .then(function (profile) {
    var jobs = profile.jobsPosted.reverse();
    var posts = profile.messagesPosted.reverse();
    console.log(profile);
    res.render('profile', {jobs:jobs, posts:posts});
  });
});

router.get('/jobs/:id/edit', function (req, res, next) {
  databaseQueries.findOneJob(req.params.id).then(function (job) {
    res.render('jobs/edit', {job: job});
  })
});

router.post('/jobs/:id/edit', function (req, res, next) {
  databaseQueries.updateJob(req.params.id, req.body)
  .then(function () {
    res.redirect('/profile');
  });
});

router.get('/jobs/:id/delete', function (req, res, next) {
  databaseQueries.deleteJob(req.params.id)
  .then(function () {
    console.log("deleted sucessfully");
    res.redirect('/profile');
  });
});

router.get('/profile/:id/delete', function (req, res, next) {
  databaseQueries.deleteUser(req.params.id)
  .then(function () {
    req.session = null;
    res.redirect('/');
  });
});

module.exports = router;
