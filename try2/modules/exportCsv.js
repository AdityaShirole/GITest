// Export all ideas to csv

var app = require("../server/server")
var fs = require("file-system")

var mongodb = app.dataSources.db.connector;
var write = function(userId) {
  var result = [];
  var writeToCsv = "Title,Body,Creation Date,Rating\n";
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
          realRes.forEach(function(item) {
            if (item.ownerId.toString() == userId) {
              result.push(item);
              writeToCsv = writeToCsv + item.ideaTitle + "," + item.ideaBody + "," + item.dateOfCreation + "," + item.rating + "\n";
            }
          });
          //Write result to csv
          fs.writeFileSync("/home/pragati/gitest/try2/ideaCsvs/" + userId + new Date().getMilliseconds() + ".csv", writeToCsv)
          resolve(true)
        });
      });
    });
  })
}

module.exports = {
  write: write
}
