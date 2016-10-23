var getThreads = function() {
  var allThreads = $('a.group-thread__link');
  var cleaned = {};
  for (var i=0; i<allThreads.length; i++) {
    var key = allThreads[i].href.split('?')[1];
    cleaned[key] = allThreads[i].children[4].innerText;
  }
  return cleaned;
};

console.log(getThreads());
if ($('a.group-thread__link').length > 0) {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://127.0.0.1:3000/top",
    data: JSON.stringify(getThreads()),
    // data: getThreads(),
    // headers: {"Content-Type": "application/x-www-form-urlencoded"},
    headers: {"Content-Type": "application/json; charset=utf-8"},
    dataType: "json",
    onload: function(response) {
      console.log(response);
      aux();
    }
  });
} else {
  aux();
}