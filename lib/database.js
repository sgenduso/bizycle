var db = require('../models');
var bcrypt = require('bcrypt');

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
  },

  signUp: function (user) {
    return db.User.findOne({email: user.signup_email})
    .then(function (foundUser) {
      if(!foundUser) {
        user.signup_password = bcrypt.hashSync(user.signup_password, 8)
        return  db.User.create(
          {
            firstName: user.signup_first_name,
            lastName: user.signup_last_name,
            email: user.signup_email,
            password: user.signup_password,
            jobsPosted: []
          })
      }
    })
  }

};
