var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  location: String,
  datePosted: Date,
  expiryDate: Date,
  contactInfo: Object,
  description: String,
  experience: String,
  source: String
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;