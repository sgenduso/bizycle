var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.set('debug', true);


module.exports = {
  Job: require('./jobModel'),
  User: require('./userModel.js'),
  Message: require('./messageModel.js')
};
