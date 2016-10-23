var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var main = require('./modules/rs-main');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ––––––––––––––––––––––––– Routes –––––––––––––––––––––––– //

app.post('/top', function(req, res) {
  main.checkData('top', req.body);
  console.log('received top POST at', new Date());
  res.send('Done');
});

app.post('/sub', function(req, res) {
  main.checkData('sub', req.body);
});

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––– //

var server = app.listen(process.env.PORT || 3000)