var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//       res.setHeader('Access-Control-Allow-Origin', '*');

//       // Request methods you wish to allow
//       // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//       // Request headers you wish to allow
//       // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// });

// Function to turn British format into American then Unix
var convertTime = function(timeString) {
  var formatSplit = timeString.split(' ')
  var dateParts = formatSplit[0].split('/');
  var newDate = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2] + " " + formatSplit[1];
  return parseInt(new Date(newDate).valueOf()/1000);
}

// ––––––––––––––––––––––––– Routes –––––––––––––––––––––––– //

app.post('/', function(req, res) {
  res.send(JSON.stringify(req.body));
});

app.post('/top', function(req, res) {

  // Prepare the object to pass into the DB.
  var findOrCreateObj = {
    where: {threadId: req.query.id},
    defaults: {threads: req.query.threads, posts: req.query.posts, latest: convertTime(req.query.latest) } 
  }

  // This is the bulk of the work.
  // If the forum model is older than new information, update model, alert users
  var spread = function(user, created) {
    if (!created && user.latest < convertTime(req.query.latest)) {
      user.threads = req.query.threads;
      user.posts = req.query.posts;
      user.latest = convertTime(req.query.latest);
      user.save();
    }
  }

  // The actual DB commands. Cleaned up for easy readability.
  db.topLevel
    .findOrCreate(findOrCreateObj)
    .spread(function(user, created) {spread(user, created);})
    .error(function(err) {console.log('An error occurred in FindOrCreate : ', error); })
    .then(function() {res.send('success'); });

});

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––– //
var server = app.listen(process.env.PORT || 3000)