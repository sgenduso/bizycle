var db = require('../models');

module.exports = {

  findJobs: function (cookie) {
    return db.Job.find({})
    .then(function (allJobs) {
      if (cookie) {
        loggedIn = true;
      }
      else {
        loggedIn = false;
      }
    return [allJobs, loggedIn];
  });
  },

  newJobs: function (jobObject) {
    return db.Job.create(
      {
        jobTitle: jobObject.title,
        companyName: jobObject.company,
        location: jobObject.location,
        activationDate: jobObject.activate,
        expiryDate: jobObject.expiry,
        contactInfo: jobObject.contact,
        description: jobObject.description,
        requirements: jobObject.requirements,
        source: jobObject.source
      });
  }

};
