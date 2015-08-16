var mongoose = require('mongoose');

mongoose.createConnection(process.env.MONGOLAB_URI);
mongoose.set('debug', true);


var messageSchema = new mongoose.Schema({
  userId: String,
  body: String,
  subject: String,
  datePosted: Date,
  likedByUsers: Array,
  comments: Array,
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
