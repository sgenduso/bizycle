var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');

router.get('/jobs', function(req, res, next) {
  db.Job.find({})
  .then(function (allJobs) {
    console.log(allJobs);
    if (req.session.user) {
      res.render('jobs', { jobs: allJobs, title: 'JOB BOARD', loggedIn: true });
    }
    else {
      res.render('jobs', { jobs: allJobs, title: 'JOB BOARD'});
    }
  });
});

router.post('/signup', function (req, res, next) {
  var user = req.body;
  db.User.findOne({email: user.signup_email})
  .then(function (user) {
    if(!user) {
      delete user.signup_confirm_password;
      user.signup_password = bcrypt.hashSync(user.signup_password);
      req.session.user = user.email;
      req.session.firstName = user.signup_first_name;
      db.User.create(user)
      .then(function () {
        res.redirect('/jobs');
      });
    } else {
      console.log("this already exists");
      res.render('jobs');
    }
  });
});



module.exports = router;
