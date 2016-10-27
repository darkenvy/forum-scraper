var db = require('../models');
var helper = require('./rs-helpers');
// console.log(helper);

var exports = module.exports = {};

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //

exports.clean = function() {
  console.log('inside clean');
  var expireTime = helper.currentTime() - 3600;
  var old = {
    where: {
      latest: {lt: expireTime}
    }
  }
  db.subLevel.destroy(old)
    .then(function(results) {
      console.log('Cleaned old entries');
    });
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //

exports.topLevel = function(id, time) {
  // Prepare the object to pass into the DB.
  var findOrCreateObj = {
    where: {threadId: id},
    defaults: {latest: helper.convertTime(time)} 
  }
  // If the forum model is older than new information, update model, alert users
  var spread = function(user, created) {
    if (!created && user.latest < helper.convertTime(time)) {
      console.log('----------------------- UPDATED: ', user.threadId, '-----------------');
      user.latest = helper.convertTime(time);
      user.save();
    }
  }
  // The actual DB commands. Cleaned up for easy readability.
  db.topLevel
    .findOrCreate(findOrCreateObj)
    .spread(function(user, created) {spread(user, created);})
    .error(function(err) {console.log('An error occurred in FindOrCreate : ', error); })
};

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //

exports.subLevel = function(id, time, name, updatedby) {
  // Prepare the object to pass into the DB.
  var findOrCreateObj = {
    where: {threadId: id},
    defaults: {
      latest: helper.convertTime(time),
      threadName: name,
      latestBy: updatedby
    } 
  }
  // If the forum model is older than new information, update model, alert users
  var spread = function(user, created) {
    if (!created && user.latest < helper.convertTime(time)) {
      console.log('----------------------- UPDATED: ', user.threadId, '-----------------');
      user.latest = helper.convertTime(time);
      user.latestBy = updatedby;
      user.save();
    }
  }
  // The actual DB commands. Cleaned up for easy readability.
  db.subLevel
    .findOrCreate(findOrCreateObj)
    .spread(function(user, created) {spread(user, created);})
    .error(function(err) {console.log('An error occurred in FindOrCreate : ', error); })

}