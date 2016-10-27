var dbUpdate = require('./db-update');
var helper = require('./rs-helpers');
var exports = module.exports = {};
var updateScheduled = false;

exports.cleanDB = function() {
  if (!updateScheduled) {
    // Set a delayed function to clean the database
    // Inside, we check to see if an update is scheduled. This way,
    // if two timeouts get set, only one will run.
    updateScheduled = true;
    console.log('set a timer for 5 minutes!');
    setTimeout(function() {
      if (updateScheduled) {
        console.log('ran updateScheduled\' clean');
        updateScheduled = false;
        dbUpdate.clean();
      }
    }, 300000); // every 5 minutes
  }
}


exports.checkData = function(topSubPost, dataPOST) {
  var currentTime = helper.currentTime();

  // Look at all the incoming times. If the time happened within 10 minutes,
  // then we can update our model. We do this to lower DB access
  for (var key in dataPOST) {
    var timeDiff = currentTime - helper.convertTime(dataPOST[key][1]) // key 387,388 // dataPOST[key] 19/10/16 09:24
    
    // console.log('++++++++++++++++++++++++++++++timediff: ', parseInt(timeDiff/60) + 'm', currentTime, dataPOST[key][1], helper.convertTime(dataPOST[key][1]));
    
    if (timeDiff <= 300) { // If the thread is newer then 5 minutes, lets update our model!
      console.log('timediff: ', parseInt(timeDiff/60) + 'm');
      switch (topSubPost) {
        case 'top':
          dbUpdate.topLevel(key, dataPOST[key][1]);
          exports.cleanDB();
          break;
        case 'sub':
          dbUpdate.subLevel(key, dataPOST[key][1], dataPOST[key][0], dataPOST[key][2]);
          exports.cleanDB();
          break;
        case 'post':
          // dbUpdate.topLevel(key, dataPOST[key]);
          // exports.cleanDB();
          break;
      }
    }
  }
}