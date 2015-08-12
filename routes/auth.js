var express = require('express');
var router = express.Router();

var db = require('../models');

router.get('/jobs', function(req, res, next) {
  db.Job.find({}, function (err, allJobs) {
    console.log(allJobs);
  });
    res.render('jobs');
  // .then(function (allJobs) {
  //   console.log(allJobs);
  //   if (req.session.user) {
  //     res.render('jobs', { jobs: allJobs, title: 'JOB BOARD', loggedIn: true });
  //   }
  //   else {
  //     res.render('jobs', { jobs: allJobs, title: 'JOB BOARD'});
  //   }
  // });
});

router.post('/signup', function (req, res, next) {

});



module.exports = router;
