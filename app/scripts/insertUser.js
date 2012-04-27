'use strict'

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/spotechnologiesdb');
var User  = require('../schemas/User');

var testUser = new User({ 
          'username' : 'test2',
          'password' : 'test2'});

testUser.save(function(err) {
  console.log('error: ' + err);
  User.find(function(err, arr) {
      console.log(arr);
      console.log('length='+arr.length);
      process.exit();
  });
});