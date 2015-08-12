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
  .then(function (foundUser) {
    if(!foundUser) {
      user.signup_password = bcrypt.hashSync(user.signup_password, 8);
      db.User.create(
        {
          firstName: user.signup_first_name,
          lastName: user.signup_last_name,
          email: user.signup_email,
          password: user.signup_password,
          jobsPosted: []
        })
      .then(function (newUser) {
        req.session.userId = newUser._id;
        req.session.userFirstName = newUser.firstName;
        res.redirect('/jobs');
      });
    } else {
      res.render('jobs', { title: 'JOB BOARD', error: 'This email is already associated with an account' });
    }
  });
});



module.exports = router;
