var exports = module.exports = {};

exports.currentTime = function() {
  // adjust current time to equal GMT time. 
  // To do this we need to see our offset and adjust it that way
  var msOffset = (60 + new Date().getTimezoneOffset()) * 60; // Do I always need the 60+? This could be a summer offset. DST.
  return msOffset + parseInt(new Date().valueOf()/1000);
}

exports.convertTime = function(time) { 
  var replacer = function(match, p1, p2, p3, p4, p5) {
    return p2 + '/' + p1 + '/' + p3 + ' ' + p4 + ':' + p5;
  }
  if (/\d+\/\d+\/\d+/.test(time)) { // "23/10/16 15:55"
    var result = time.replace(/(\d+)\/(\d+)\/(\d+)\s(\d+):(\d+)/, replacer );
    return parseInt(new Date(result).valueOf()/1000);
  } 
  else if (/\d+-\w+-\d+/.test(time)) { // "23-Oct-2016 16:12:35"
    var result = time.replace(/(\d+)-(\w+)-(\d+)\s(\d+):(\d+):(\d+)/, replacer );
    return parseInt(new Date(result).valueOf()/1000);
  } 
  else {return 0;}
}




