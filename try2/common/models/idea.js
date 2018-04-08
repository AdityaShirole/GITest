'use strict';

module.exports = function(Idea) {
  Idea.beforeRemote('create', function(ctx, instance, next) {
    ctx.args.data.dateOfCreation = new Date();
    ctx.args.data.ownerId = ctx.req.accessToken.userId;
    next();
  });
};
