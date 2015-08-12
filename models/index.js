var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/CoBBB');
// mongoose.connect(process.env.MONGOLAB_URI);
// mongoose.set('debug', true);

module.exports = {
  Job: require('./jobModel')
};

// module.exports.Job = require('./jobModel')
