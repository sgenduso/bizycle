var mongoose = require('mongoose');
<<<<<<< HEAD
=======
mongoose.createConnection(process.env.MONGOLAB_URI);
mongoose.set('debug', true);
>>>>>>> bf6b88947faa418196d87792c799b6b50852fd51

var jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  location: String,
  datePosted: Date,
  expiryDate: Date,
  contactInfo: Object,
  description: String,
  requirements: String,
  source: String
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
