var exports = module.exports = {};

// exports.convertTime = function(timeString) {
//   var formatSplit = timeString.split(' ')
//   var dateParts = formatSplit[0].split('/');
//   var newDate = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2] + " " + formatSplit[1];
//   return parseInt(new Date(newDate).valueOf()/1000);
// }

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
