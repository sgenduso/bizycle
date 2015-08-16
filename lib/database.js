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
      globalVars.push(newJob);
      console.log(newJob, "on database side");
      foundUser = globalVars[1];
      foundUser.jobsPosted.push(newJob._id);
        return db.User.update({_id: foundUser._id}, {jobsPosted: foundUser.jobsPosted});
    });
  },

  signUp: function (user) {
    return db.User.findOne({email: user.signup_email})
    .then(function (foundUser) {
      if(!foundUser) {
        user.signup_password = bcrypt.hashSync(user.signup_password, 8);
        return  db.User.create(
          {
            firstName: user.signup_first_name,
            lastName: user.signup_last_name,
            email: user.signup_email,
            password: user.signup_password,
            jobsPosted: []
          });
      }

    });
  },

  dateParse: function (date) {
   date = date.toString().split(" ").slice(1,5);
    var time = date[3].split(":");
    var meridiem = " a.m.";
    if(time[0]>12){
      meridiem = " p.m.";
      time[0]-=12;
    }
    time[2]+=meridiem;
    time = time.join(":");
    date[3]= time;
    date = date.join(", ");
    return date;

  },

  populateProfile: function (userId) {
    var profile ={};
    return db.User.findOne({_id: userId})
    .then(function (foundUser) {
      return db.Job.find({_id: {$in: foundUser.jobsPosted}}).then(function (jobsPosted) {
        profile.jobsPosted = jobsPosted;
        return db.Message.find({userId:userId}).then(function (messagesPosted) {
          profile.messagesPosted = messagesPosted;
          return profile;
        });
        });
      });
  },

  findOneJob: function (jobId) {
    return db.Job.findOne({_id: jobId});
  },

  updateJob: function (jobId, updatedJob) {
    return db.Job.update({_id: jobId}, updatedJob);
  },

  deleteJob: function (jobId) {
    return db.Job.remove({_id: jobId});
  },

  deleteUser: function (userId) {
    return db.User.findOne({_id: userId})
    .then(function (foundUser) {
      return db.Job.remove({_id: {$in: foundUser.jobsPosted}});
    })
    .then(function () {
      return db.User.remove({_id: userId});
    });
  },

  findUser: function (user) {
    return db.User.findOne({email: user.login_email});
  },

  deleteMessage: function (messageId) {
    return db.Message.remove({_id:messageId});
  },

  createMessage: function (userInfo, bodyInfo) {
    return db.Message.create({
        userId: userInfo,
        body: bodyInfo.message_body,
        subject: bodyInfo.subject,
        datePosted: new Date(),
        likedbyUsers: [],
        comments: [],
      });
  },

  findLiked: function (messageId) {
    return db.Message.findOne({_id: messageId});
  },

  findAllMessages: function () {
    return db.Message.find({});
},

  findUserById: function (userId) {
    return db.User.findOne({_id:userId});
 },

  updateLikedUsers: function (messageId, pullPush, userId) {
    if(pullPush === "pull"){
    return db.Message.update({_id: messageId}, {$pull: {likedByUsers: userId}});
  }else{
    return db.Message.update({_id: messageId}, {$push: {likedByUsers: userId}});
   }
  },

};
