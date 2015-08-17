  var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../models');
var databaseQueries = require('../lib/database.js')

router.get('/jobs/alljobs', function(req, res, next) {
  var userCookie = req.session.userId;
  databaseQueries.findJobs(userCookie)
  .then(function (returnedVals) {
    allJobs = returnedVals[0];
    loggedIn = returnedVals[1];
    res.render('jobs/alljobs', { jobs: allJobs, title: 'JOB BOARD', loggedIn: loggedIn});
  })
});

router.post('/signup', function (req, res, next) {
  var user = req.body;
  var path = req.body.path;
  databaseQueries.signUp(user)
  .then(function (addedUser) {
    if(addedUser) {
      req.session.userId = addedUser._id;
      req.session.userFirstName = addedUser.firstName;
      console.log("cookies created");
      console.log(path, "path");
      if(path === 'index') {
        res.json("");
      }
      else {
        res.json(path);
      }
    }
    else {
      console.log(addedUser);
      res.json({error: 'This email is already associated with an account'});
    }

  })
})

// router.post('/signup', function (req, res, next) {
//     if(req.body != "final twilio test") {
//     res.send('got the message!')
//     }
//     else {
//     items.find({})
//       .then(function (allItems) {
//         console.log(allItems, "allitems");
//         res.send({items: allItems});
//         console.log("sent to the other side");
//       })
//   }
  // console.log(req.body);
  // res.json({firstName: 'hey'})
  // res.render('profile')
  // var user = req.body;
  // var path = req.body.path;
  //   databaseQueries.signUp(user).then(function (newUser) {
  //     if(newUser){
  //       req.session.userId = newUser._id;
  //       req.session.userFirstName = newUser.firstName;
  //       console.log(path, "REDIRECT TO PATH");
  //       res.redirect('/' + path);
  //     }
  //    else {
  //      console.log(path, "RENDERED WITH ERRORS");
  //     res.render(path, { title: 'JOB BOARD', error: 'This email is already associated with an account.'});
  //   }
  // });
// });
router.post('/login', function (req, res, next) {
  var user= req.body;
  var path = req.body.path;
  databaseQueries.findUser(user)
  .then(function (foundUser) {
    if(foundUser) {
      console.log(foundUser, "finds user");
      if(bcrypt.compareSync(user.login_password, foundUser.password)) {
        req.session.userId = foundUser._id;
        req.session.userFirstName = foundUser.firstName;
        if(path === 'index') {
          console.log('REDIRECT TO INDEX');
          res.json("");
        }
        else {
          console.log("PATH");
          res.json(path);
        }
      }
      else {
        console.log("PASS DOES NOT MATCH");
        res.json({error: 'Passwords do not match'});
      }
    }
    else {
      console.log("NO USER");
      res.json({error: 'User not found'})
    }
  })
})

// router.post('/login', function (req, res, next) {
//   var user = req.body;
//   var path = req.body.path
//   databaseQueries.findUser(user)
//   .then(function (foundUser) {
//     if(foundUser) {
//       if(bcrypt.compareSync(user.login_password, foundUser.password)) {
//         req.session.userId = foundUser._id;
//         req.session.userFirstName = foundUser.firstName;
//         console.log(path, 'WENT TO REDIRECT');
//         res.redirect('/' + path)
//       }
//       else {
//         console.log(path, "PASSWORD DONt MATCH");
//         res.render(path, { title: 'JOB BOARD', error: 'Incorrect password.'});
//       }
//     }
//     else {
//       console.log(path, 'USER NOT FOUND');
//       res.render(path, { title: 'back again', error: 'User not found.'});
//     }
//   })
// })



module.exports = router;
