// Rate an idea out of 0-10 stars
var app = require("../server/server")

var mongodb = app.dataSources.db.connector;
var update = function(ideaTitle, rating, userId) {
  var result = [];
  return new Promise(function(resolve, reject) {
    mongodb.connect(function(err, db) {
      var collection = db.collection('idea'); //name of db collection
      if (rating < 0 || rating > 10) {
        reject({
          err: "Rating should be within 0 to 10"
        })
      }
      collection.updateOne({
        ideaTitle: ideaTitle,
        ownerId: userId
      }, {
        $set: {
          "rating": rating
        }
      }, function(err, res) {

        if (err) {
          reject(err)
        }
        resolve(true)
      });
    });
  })
}

module.exports = {
  rate: update
}
