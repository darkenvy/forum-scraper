var exports = module.exports = {};

exports.convertTime = function(timeString) {
  var formatSplit = timeString.split(' ')
  var dateParts = formatSplit[0].split('/');
  var newDate = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2] + " " + formatSplit[1];
  return parseInt(new Date(newDate).valueOf()/1000);
}

