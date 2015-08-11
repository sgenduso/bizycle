var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorado Bikes + Biz + Beer' });
});

router.get('/jobs', function(req, res, next) {
  // req.session.user = "akhil";
  // req.session.otherCookie = "sankar";
  console.log(res.locals);
  if (req.session.user) {
    res.render('jobs', { title: 'JOB BOARD', loggedIn: true });

  } else {
    res.render('jobs', { title: 'JOB BOARD'});
  }
});



module.exports = router;
