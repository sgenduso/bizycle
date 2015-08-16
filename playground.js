var db = require('./models')

db.Job.create({
  jobTitle: 'adfasd',
  companyName: 'aaaa',
  location: 'here',
  datePosted: 'now',
  expiryDate: 'then',
  contactInfo: {},
  description: 'asdfa',
  requirements: 'none',
  source: 'comp',
  jobPoster: 'me'
});
