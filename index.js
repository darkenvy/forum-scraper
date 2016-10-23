var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Function to turn British format into American then Unix
var convertTime = function(timeString) {
  var formatSplit = timeString.split(' ')
  var dateParts = formatSplit[0].split('/');
  var newDate = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2] + " " + formatSplit[1];
  return parseInt(new Date(newDate).valueOf()/1000);
}

// ––––––––––––––––––––––––– Routes –––––––––––––––––––––––– //

app.post('/', function(req, res) {
  
  var currentTime = parseInt(new Date().valueOf()/1000),
      times = req.body;
  // Look at all the incoming times. If the time happened within 10 minutes,
  // then we can update our model. We do this to lower DB access
  for (var key in times) {
    var timeDiff = currentTime - convertTime(times[key]) // key 387,388 // times[key] 19/10/16 09:24
    if (timeDiff <= 600) { updateTopLevel(key, times[key]); } // If the thread is newer then 10 minutes, lets update our model!
  }
  console.log('received POST at', new Date());
  res.send('Done');
});

// ––––––––––––––––––––– DB Functions –––––––––––––––––––– //

function updateTopLevel(id, time) {
  // Prepare the object to pass into the DB.
  var findOrCreateObj = {
    where: {threadId: id},
    defaults: {latest: convertTime(time)} 
  }
  // If the forum model is older than new information, update model, alert users
  var spread = function(user, created) {
    if (!created && user.latest < convertTime(time)) {
      console.log('----------------------- UPDATED: ', user.threadId, '-----------------');
      user.latest = convertTime(time);
      user.save();
    }
  }
  // The actual DB commands. Cleaned up for easy readability.
  db.topLevel
    .findOrCreate(findOrCreateObj)
    .spread(function(user, created) {spread(user, created);})
    .error(function(err) {console.log('An error occurred in FindOrCreate : ', error); })
};

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––– //

var server = app.listen(process.env.PORT || 3000)