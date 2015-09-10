var express = require('express');
var router = express.Router();
var validate = require('../lib/validate.js');
var db = require('../models');
var databaseQueries = require('../lib/database.js');

router.get('/messages', function (req, res, next) {
databaseQueries.populateMessageboard()
.then(function (messages) {
   res.render("messages/messageboard", {messages:messages.reverse()});
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
  databaseQueries.toggleLikes(req.params.id, req.session.userId)
  .then(function (objToSend) {
    res.json(objToSend);
  });
});

router.get('/messages/liked/:id', function (req, res, next) {
  databaseQueries.checkForLikes(req.params.id, req.session.userId).then(function (objToSend) {
     res.json(objToSend);
 });
});

router.post('/messages', function (req, res, next) {
  databaseQueries.createMessage(req.session.userId, req.body).then(function (created) {
  res.redirect('/messages');

 });
});



module.exports = router;
