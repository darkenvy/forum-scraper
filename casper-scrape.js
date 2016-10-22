// First two lines are needed. see this:http://stackoverflow.com/questions/25761028/cannot-find-module-casper-when-invoking-through-phantomjs
phantom.casperPath = 'node_modules/casperjs';
phantom.injectJs('node_modules/casperjs/bin/bootstrap.js');


var userAgent = function() {
  var agents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
    "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16"
  ]
  return agents[Math.floor(Math.random()*agents.length+1)];
}

var casperSettings = {pageSettings: {userAgent: userAgent()}};
var casper = require("casper").create(casperSettings);
var url = '';
var currentPage = 1;
var listings = [];

var terminate = function() {this.echo("Exiting..").exit();};
var processPage = function() {
    // Function passed into DOM
    var getThreads = function() {
      var allThreads = $('a.group-thread__link');
      var cleaned = [];
      for (var i=0; i<allThreads.length; i++) {
        cleaned.push({
          threadId: allThreads[i].href.split('?')[1],
          threads: allThreads[i].children[2].innerText,
          posts: allThreads[i].children[3].innerText,
          latest: allThreads[i].children[4].innerText
        });
      };
      return cleaned;
    };

    listings = this.evaluate(getThreads);
    require('utils').dump(listings)
};

// –––––––––––––––––––––––– MAIN –––––––––––––––––––––––––––– //

casper.start(url);
casper.waitForSelector('.main', processPage, terminate, 10000);
casper.run();
console.log("Waiting for callback");