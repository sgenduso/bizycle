  var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');
var databaseQueries = require('../lib/database.js')

router.get('/jobs', function(req, res, next) {
  var userCookie = req.session.userId;
  databaseQueries.findJobs(userCookie)
  .then(function (returnedVals) {
    allJobs = returnedVals[0];
    loggedIn = returnedVals[1];
    res.render('jobs', { jobs: allJobs, title: 'JOB BOARD', loggedIn: loggedIn});
  })
});

router.post('/signup', function (req, res, next) {
  var user = req.body;
  console.log(req.body.path);
  var path = req.body.path;
  console.log(path,"PATH");
    databaseQueries.signUp(user).then(function (newUser) {
      if(newUser){
        req.session.userId = newUser._id;
        req.session.userFirstName = newUser.firstName;
        res.redirect('/' + path);
      }
     else {
      res.render(path, { title: 'JOB BOARD', error: 'This email is already associated with an account.'});
    }
  });
});

router.post('/login', function (req, res, next) {
  var user = req.body;
  var path = req.body.path
  db.User.findOne({email: user.login_email})
  .then(function (foundUser) {
    if(foundUser) {
      if(bcrypt.compareSync(user.login_password, foundUser.password)) {
        req.session.userId = foundUser._id;
        req.session.userFirstName = foundUser.firstName;
        res.redirect('/' + path)
      }
      else {
        res.render(path, { title: 'JOB BOARD', error: 'Incorrect password.'});
      }
    }
    else {
      res.render(path, { title: 'JOB BOARD', error: 'User not found.'});
    }
  })
})



module.exports = router;
