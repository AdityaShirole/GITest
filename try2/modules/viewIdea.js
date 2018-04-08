// View Idea by given Date

var app = require("../server/server")

var mongodb = app.dataSources.db.connector;
var collect = function(months, minRating, userId) {
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
          var reqDate = new Date();
          reqDate.setMonth(reqDate.getMonth() - months);
          console.log("reqDate", reqDate);
          realRes.forEach(function(item) {
            if (item.dateOfCreation.getDate() >= reqDate.getDate()) {
              if (item.ownerId.toString() == userId) {
                if (item.rating >= minRating) {
                  result.push(item);
                }
              }
            }
          });
          // console.log("resultArray", result);
          resolve(result)
        });
      });
    });
  })
}

module.exports = {
  collect: collect
}
