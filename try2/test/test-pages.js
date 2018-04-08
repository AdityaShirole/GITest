'use strict';
var expect = require('chai').expect;
var request = require('request');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = 'http://localhost:3000';

it('Login User', function(done) {
  chai.request(app)
    .post('/api/users/login')
    .send({
      'username': 'pragati',
      'email': 'qragatigarg@gmail.com',
      'password': '3532',
    })
    .end(function(err, res) {
      if (err) done(err);
      expect(res.id);
      done();
    });
});
