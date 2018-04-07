// // Create a Profile
//
// var app = require('./../server/server');
// var db = app.dataSources.db;
//
//
//
// var update = function(details) {
//   console.log("Hey! I am in update profile ", details);
//   db.user.find({}, function(err, users) {
//     console.log("Hey I have all the users");
//     console.log(users);
//   });
// }
//
// module.exports = {
//   updateProfile: update
// }
//
//
// // Add this in user.js
// User.remoteMethod('profile', {
//   http: {
//     path: '/profile',
//     verb: 'post'
//   },
//   accepts: [{
//     arg: 'details',
//     type: 'object',
//     required: true
//   }],
//   returns: {
//     arg: 'result',
//     type: 'object'
//   }
// });
//
// User.profile = function(details, cb) {
//   profile.updateProfile(details);
//   cb(null, {
//     'response': 'ok'
//   });
// }
