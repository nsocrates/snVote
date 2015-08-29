/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

// 'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

Poll.find({}).remove(function() {
  Poll.create({
    name: 'server',
    name_id: 'test',
    question: 'My name is',
    options: [['What?', 1], ['Who?', 2,], ['Slim Shady', 5]],
    create_at: 1440441278927
  }, {
    name: 'server',
    name_id: 'test',
    question: 'Coke or Pepsi?',
    options: [['Coke', 1], ['Pepsi', 1]],
    create_at: 1440529334472
  }, function() {
      console.log('sample poll data created');
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
  });
});