'use strict';
module.exports = function(sequelize, DataTypes) {
  var subLevel = sequelize.define('subLevel', {
    threadId: DataTypes.STRING,
    threadName: DataTypes.STRING,
    posts: DataTypes.INTEGER,
    latest: DataTypes.INTEGER,
    latestBy: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return subLevel;
};