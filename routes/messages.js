var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');
var databaseQueries = require('../lib/database.js');

router.get('/messages', function (req, res, next) {
  return db.Message.find().then(function (messages) {
  if (messages.length>0){
    var msgPromises = messages.map(function (message, i) {
      return db.User.findOne({_id:message.userId}).then(function (user) {
        messages[i].dateNew = databaseQueries.dateParse(messages[i].datePosted);
        messages[i].postedBy = user.firstName+" "+user.lastName.substring(0,0)+".";
      });
    });
    Promise.all(msgPromises).then(function () {
       res.render("messages/messageboard", {messages:messages});
     });
    } else{
    res.render("messages/messageboard");
  }
 });
});


router.post('/messages/:id/delete', function (req, res, next) {
  db.Message.remove({_id:req.params.id}).then(function (message) {
    res.redirect("/messages");
  });
});

router.get('/messages/togglelike/:id', function (req, res, next) {
  var objectToSend= {};
  db.Message.findOne({_id: req.params.id}).then(function (message) {
    if (message.likedByUsers.indexOf(req.session.userId) > -1) {
      db.Message.update({_id: req.params.id}, {$pull: {likedByUsers: req.session.userId}})
      .then(function () {
        objectToSend.userInLikedArray = false;
        objectToSend.numOfLikes = message.likedByUsers.length -1;
        res.json(objectToSend);
      });
    } else {
      db.Message.update({_id: req.params.id}, {$push: {likedByUsers: req.session.userId}})
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
  db.Message.findOne({_id: req.params.id}).then(function (message) {
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
  return db.Message.create({
      userId: req.session.userId,
      body: req.body.message_body,
      subject: req.body.subject,
      datePosted: new Date(),
      likedbyUsers: [],
      comments: [],
    }).then(function (created) {
  res.redirect('/messages');

 });
});

module.exports = router;
