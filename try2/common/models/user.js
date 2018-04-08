'use strict';
var app = require('../../server/server');
var viewIdeaByDateJs = require('../../modules/viewIdeaByDate');
var rateIdeaJs = require('../../modules/rateIdea');
var viewIdea = require('../../modules/viewIdea');
var exportCsv = require('../../modules/exportCsv');
var addTagJs = require('../../modules/addTag');
var populateListJs = require('../../modules/populateList');
module.exports = function(User) {
  // User can write an idea
  User.writeIdea = function(ctx, cb) {
    var Idea = app.models.idea;
    if (!ctx.body.title || !ctx.body.body) {
      cb('Please Enter title and body', null);
    }
    Idea.create({
      'ideaTitle': ctx.body.title,
      'ideaBody': ctx.body.body,
      'dateOfCreation': new Date(),
      'ownerId': ctx.accessToken.userId,
    });
    var result = {
      'response': 'Idea saved Successfully',
    };
    cb(null, result);
  };

  // User can view all ideas of a given date
  User.viewIdeaByDate = function(ctx, cb) {
    if (!ctx.body.dateRequired) {
      cb('Please Enter dateRequired', null);
    }
    var viewPromise = viewIdeaByDateJs.collect(ctx.body.dateRequired,
      ctx.accessToken.userId);
    viewPromise.then(function(response) {
      // console.log('response', response);
      var result = {
        response: response,
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null);
    });
  };

  // View Ideas all ideas over the last X months with minimum Y stars
  User.viewIdea = function(ctx, cb) {
    if (!ctx.body.months) {
      ctx.body.months = 1; // Default 1 month
    }
    if (!ctx.body.minRating) {
      ctx.body.minRating = 0; // Defaulted to 0
    }
    var viewPromise = viewIdea.collect(ctx.body.months, ctx.body.minRating,
      ctx.accessToken.userId);
    viewPromise.then(function(response) {
      var result = {
        response: response,
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null);
    });
  };

  //Rate an idea from 0-10
  User.rateIdea = function(ctx, cb) {
    if (!ctx.body.ideaTitle || !ctx.body.rating) {
      cb('Please Enter ideaTitle and rating', null);
    }
    if (ctx.body.rating < 0 || ctx.body.rating > 10) {
      cb('Please enter rating between 0-10', null);
    }
    var ratePromise = rateIdeaJs.rate(ctx.body.ideaTitle, ctx.body.rating,
      ctx.accessToken.userId);
    ratePromise.then(function(response) {
      // console.log('response', response);
      var result = {
        response: response,
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null);
    });
  };

  // Add Catergories to Ideas
  User.tagIdea = function(ctx, cb) {
    if (!ctx.body.ideaTitle || !ctx.body.tag) {
      cb('Please Enter ideaTitle and tag', null);
    }
    var tagPromise = addTagJs.tag(ctx.body.ideaTitle,
      ctx.body.tag, ctx.accessToken.userId);
    tagPromise.then(function(response) {
      // console.log('response', response);
      var result = {
        response: response,
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null);
    });
  };

  // Export all ideas to csv
  User.exportToCsv = function(ctx, cb) {
    var writePromise = exportCsv.write(ctx.accessToken.userId);
    writePromise.then(function(response) {
      // console.log('response', response);
      var result = {
        response: response,
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null);
    });
  };

  // User can create a list
  User.createList = function(ctx, cb) {
    var List = app.models.list;

    if (!ctx.body.title || !ctx.body.ideaArray) {
      cb('Please Enter title and ideaArray', null);
    }
    List.create({
      'listTitle': ctx.body.title,
      'ideaArray': ctx.body.ideaArray,
      'dateOfCreation': new Date(),
      'ownerId': ctx.accessToken.userId,
    });
    var result = {
      'response': 'List saved Successfully',
    };
    cb(null, result);
  };

  //Populate List
  User.populateList = function(ctx, cb) {
    if (!ctx.body.title || !ctx.body.ideaArray) {
      cb('Please Enter listTitle and ideaArray', null);
    }
    var ratePromise = populateListJs.populate(ctx.body.title,
      ctx.body.ideaArray,
      ctx.accessToken.userId);
    ratePromise.then(function(response) {
      // console.log('response', response);
      var result = {
        response: response,
      };
      cb(null, result);
    }).catch(function(err) {
      cb(err, null);
    });
  };
};
