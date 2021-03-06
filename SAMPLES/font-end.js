var getTopThreads = function() {
  var allThreads = $('a.group-thread__link');
  var cleaned = {};
  for (var i=0; i<allThreads.length; i++) {
    var key = allThreads[i].href.split('?')[1];
    var value = [
      0,// thread title // UNDEFINED for this event
      allThreads[i].children[4].innerText, // time
      0,// post update by // UNDEFINED for this event
    ];
    cleaned[key] = value;
  }
  return cleaned;
};

var getSubThreads = function() {
  var allThreads = $('a.thread-plate__main-link');
  var cleaned = {};
  for (var i=0; i<allThreads.length; i++) {
    var key = allThreads[i].href.split('?')[1]; // thread id
    var value = [
      allThreads[i].children[1].innerText.split('created by ')[0].split('\n')[0], // thread title
      allThreads[i].parentElement.children[1].innerText.split('by ')[0].split('\n')[0], // time
      allThreads[i].parentElement.children[1].innerText.split('by ')[1] // post update by
      ];
    cleaned[key] = value;
  }
  return cleaned;
};


// –––––––––––––––––––––––––––––––––––––––––––––––––––––– //


function sendPOST(dataJSON, path) {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://127.0.0.1:3000/" + path,
    data: dataJSON,
    headers: {"Content-Type": "application/json; charset=utf-8"},
    dataType: "json",
    onload: function(response) {
      console.log(response);
      aux();
      console.log('ran aux');
    }
  });

  if (path == 'sub') { setTimeout(function() {aux();}, 2000); } // idk why when path=sub, onload wont run.
}

$(document).ready(function() {
  if ($('a.group-thread__link').length > 0) {
    console.log('top level forum');
    var data = JSON.stringify( getTopThreads() );
    sendPOST(data, 'top');
  } 
  else if ($('a.thread-plate__main-link').length > 0) {
    console.log('sub level forum');
    var data = JSON.stringify( getSubThreads() );
    sendPOST(data, 'sub');
  }
  else {
    console.log('nothing found :(');
    aux();
  }
});