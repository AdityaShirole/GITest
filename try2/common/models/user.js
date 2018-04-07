'use strict';
var app = require('../../server/server');
var viewIdeaByDateJs = require('../../modules/viewIdeaByDate');
var rateIdeaJs = require('../../modules/rateIdea');
var viewIdea = require('../../modules/viewIdea');
var exportCsv = require('../../modules/exportCsv');
module.exports = function(User) {



  User.writeIdea = function(ctx, cb) {
    var Idea = app.models.idea;
    Idea.create({
      "ideaTitle": ctx.body.title,
      "ideaBody": ctx.body.body,
      "dateOfCreation": new Date(),
      "ownerId": ctx.accessToken.userId
    })
    var result = {
      'response': 'ok'
    };
    cb(null, result);
  }

  User.viewIdeaByDate = function(ctx, cb) {

    var viewPromise = viewIdeaByDateJs.collect(ctx.body.dateRequired, ctx.accessToken.userId)
    viewPromise.then(function(response) {
      // console.log("response", response);
      var result = {
        response: response
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null)
    })
  }

  User.viewIdea = function(ctx, cb) {

    var viewPromise = viewIdea.collect(ctx.body.months, ctx.body.minRating, ctx.accessToken.userId)
    viewPromise.then(function(response) {
      // console.log("response", response);
      var result = {
        response: response
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null)
    })
  }

  User.rateIdea = function(ctx, cb) {

    var ratePromise = rateIdeaJs.rate(ctx.body.ideaTitle, ctx.body.rating, ctx.accessToken.userId)
    ratePromise.then(function(response) {
      // console.log("response", response);
      var result = {
        response: response
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null)
    })
  }


  User.exportToCsv = function(ctx, cb) {
    var writePromise = exportCsv.write(ctx.accessToken.userId)
    writePromise.then(function(response) {
      // console.log("response", response);
      var result = {
        response: response
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null)
    })
  }

};
