var mongoose = require('mongoose');

mongoose.createConnection(process.env.MONGOLAB_URI);
mongoose.set('debug', true);


var jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  location: String,
  datePosted: String,
  expiryDate: String,
  contactInfo: Object,
  description: String,
  requirements: String,
  source: String,
  jobPoster: String
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
