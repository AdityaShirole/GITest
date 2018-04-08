// Populate List with ideas
'use strict';
var app = require('../server/server');
var mongodb = app.dataSources.db.connector;

var populate = function(listTitle, ideaArray, userId) {
  var result = [];
  return new Promise(function(resolve, reject) {
    mongodb.connect(function(err, db) {
      var collection = db.collection('list'); //name of db collection
      collection.updateOne({
        listTitle: listTitle,
        ownerId: userId,
      }, {
        $addToSet: {
          ideaArray: {
            $each: ideaArray,
          },
        },
      }, function(err, res) {
        if (err) {
          reject(err);
        }
        // console.log('Result: ', res);
        resolve(true);
      });
    });
  });
};

module.exports = {
  populate: populate,
};
