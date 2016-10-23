var dbUpdate = require('./db-update');
var helper = require('./rs-helpers');
var exports = module.exports = {};

exports.checkData = function(topSubPost, dataPOST) {
  var currentTime = parseInt(new Date().valueOf()/1000);
  // Look at all the incoming times. If the time happened within 10 minutes,
  // then we can update our model. We do this to lower DB access
  for (var key in dataPOST) {
    // var timeDiff = 9000000
    var timeDiff = currentTime - helper.convertTime(dataPOST[key]) // key 387,388 // dataPOST[key] 19/10/16 09:24
    if (timeDiff <= 600) { // If the thread is newer then 10 minutes, lets update our model!
      switch (topSubPost) {
        case 'top':
          dbUpdate.topLevel(key, dataPOST[key]);
          break;
        case 'sub':
          dbUpdate.subLevel(key, dataPOST[key]);
          break;
        case 'post':
          // dbUpdate.topLevel(key, dataPOST[key]);
          break;
      }
    }
  }
}