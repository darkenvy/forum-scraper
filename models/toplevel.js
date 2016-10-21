'use strict';
module.exports = function(sequelize, DataTypes) {
  var topLevel = sequelize.define('topLevel', {
    threadId: DataTypes.STRING,
    threads: DataTypes.INTEGER,
    posts: DataTypes.INTEGER,
    latest: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return topLevel;
};