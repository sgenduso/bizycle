var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');
var databaseQueries = require('../lib/database.js');

router.get('/messages', function (req, res, next) {
  db.Message.find().then(function (messages) {
   messages.forEach(function (message) {
     message.datePosted = databaseQueries.dateParse(message.datePosted);
   });
  res.render("messages/messageboard", {messages:messages});
});
});

router.post('/messages/:id/delete', function (req, res, next) {
  db.Message.remove({_id:req.params.id}).then(function (message) {
    res.redirect("/messages");
  });
});

router.get('/messages/liked/:id', function (req, res, next) {
  db.Message.findOne({_id: req.params.id}).then(function (message) {
    var userInLikedArray;
    if (message.likedByUsers.indexOf(req.session.userId) >0 -1) {
      db.Message.update({_id: req.params.id}, {$pull: {likedByUsers: req.session.userId}})
      .then(function (message) {
        userInLikedArray = false;
        res.json(userInLikedArray);
      });
    } else {
      db.Message.update({_id: req.params.id}, {$push: {likedByUsers: req.session.userId}})
      .then(function (message) {
        userInLikedArray = true;
        res.json(userInLikedArray);
      });
    }
});
});

router.post('/messages', function (req, res, next) {
  db.Message.create({
      userId: req.session.userId,
      body: req.body.message_body,
      subject: req.body.subject,
      datePosted: new Date(),
      likedbyUsers: [],
      comments: [],
    }).then(function () {
  res.redirect('/messages');

 });
});

module.exports = router;
