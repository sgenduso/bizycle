var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');
var databaseQueries = require('../lib/database.js');

router.get('/messages', function (req, res, next) {
databaseQueries.populateMessageboard()
.then(function (messages) {
    console.log(messages);
   res.render("messages/messageboard", {messages:messages});
 });
});


router.post('/messages/:id/delete', function (req, res, next) {
  databaseQueries.deleteMessage(req.params.id).then(function () {
    res.redirect("/messages");
  });
});

router.get('/messages/:id/delete', function (req, res, next) {
  databaseQueries.deleteMessage(req.params.id).then(function () {
    res.redirect("/profile");
  });
});

router.get('/messages/togglelike/:id', function (req, res, next) {
  var objectToSend= {};
  databaseQueries.findLiked(req.params.id).then(function (message) {
    if (message.likedByUsers.indexOf(req.session.userId) > -1) {
      databaseQueries.updateLikedUsers(req.params.id, 'pull', req.session.userId)
      .then(function () {
        objectToSend.userInLikedArray = false;
        objectToSend.numOfLikes = message.likedByUsers.length -1;
        res.json(objectToSend);
      });
    } else {
      databaseQueries.updateLikedUsers(req.params.id, 'push', req.session.userId)
      .then(function () {
        objectToSend.userInLikedArray = true;
        objectToSend.numOfLikes = message.likedByUsers.length +1;
        res.json(objectToSend);
      });
    }
});
});

router.get('/messages/liked/:id', function (req, res, next) {
  var objectToSend= {};
  databaseQueries.findLiked(req.params.id).then(function (message) {
    if (message.likedByUsers.indexOf(req.session.userId) > -1) {
        objectToSend.userInLikedArray = true;
        objectToSend.numOfLikes = message.likedByUsers.length;
        res.json(objectToSend);
    } else {
        objectToSend.userInLikedArray = false;
        objectToSend.numOfLikes = message.likedByUsers.length;
        res.json(objectToSend);
    }
     res.json(objectToSend);
 });
});

router.post('/messages', function (req, res, next) {
  databaseQueries.createMessage(req.session.userId, req.body).then(function (created) {
  res.redirect('/messages');

 });
});



module.exports = router;
