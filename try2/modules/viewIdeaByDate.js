// View Idea by given Date
'use strict';
var app = require('../server/server');

var mongodb = app.dataSources.db.connector;
var collect = function(date, userId) {
  var result = [];
  return new Promise(function(resolve, reject) {
    mongodb.connect(function(err, db) {
      var collection = db.collection('idea'); //name of db collection
      collection.find(function(err, res) {
        if (err) {
          reject(err);
        }
        res.toArray(function(err, realRes) {
          if (err) {
            reject(err);
          }
          var reqDate = new Date(date);
          realRes.forEach(function(item) {
            if ((item.dateOfCreation.getYear() == reqDate
                .getYear()) && (item.dateOfCreation.getMonth() ==
                reqDate.getMonth()) && (item.dateOfCreation
                .getDate() == reqDate.getDate())) {
              if (item.ownerId.toString() == userId) {
                result.push(item);
              }
            }
          });
          // console.log("resultArray", result);
          resolve(result);
        });
      });
    });
  });
};

module.exports = {
  collect: collect,
};
