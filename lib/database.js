var db = require('../models');
var bcrypt = require('bcrypt');

var globalVars = [];

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

  newJobs: function (userId, jobObject) {
    globalVars.push(jobObject);
    return db.User.findOne({_id: userId})
    .then(function (foundUser) {
      globalVars.push(foundUser);
      var jobObject = globalVars[0];
      return db.Job.create(
       {
         jobTitle: jobObject.title,
         companyName: jobObject.company,
         location: jobObject.location,
         datePosted: jobObject.activate,
         expiryDate: jobObject.expiry,
         contactInfo: jobObject.contact,
         description: jobObject.description,
         requirements: jobObject.requirements,
         source: jobObject.source,
         jobPoster: foundUser._id
      });
    })
    .then(function (newJob) {
      globalVars.push(newJob)
      console.log(newJob, "on database side");
      foundUser = globalVars[1];
      foundUser.jobsPosted.push(newJob._id);
        return db.User.update({_id: foundUser._id}, {jobsPosted: foundUser.jobsPosted})
    })
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
  },

  populateProfile: function (userId) {
    return db.User.findOne({_id: userId})
    .then(function (foundUser) {
      // console.log(foundUser.jobsPosted, 'USER');
      return db.Job.find({_id: {$in: foundUser.jobsPosted}})
    })
  },

  findOneJob: function (jobId) {
    return db.Job.findOne({_id: jobId})
  }
};
