var mongoose = require('mongoose');
// mongoose.createConnection(process.env.MONGOLAB_URI);
// mongoose.set('debug', true);

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
