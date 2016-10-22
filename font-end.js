var getThreads = function() {
  var allThreads = $('a.group-thread__link');
  var cleaned = {}
  for (var i=0; i<allThreads.length; i++) {
    var key = allThreads[i].href.split('?')[1];
    cleaned[key] = allThreads[i].children[4].innerText;
  };
  return cleaned;
};


$.ajax({
  type: "POST",
  url: "localhost:3000",
  data: getThreads,
  // success: success
  // dataType: "json"
}).done(function(res) {
  console.log(res);
})