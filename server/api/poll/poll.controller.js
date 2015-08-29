/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /polls              ->  index
 * POST    /polls              ->  create
 * GET     /polls/:id          ->  show
 * PUT     /polls/:id          ->  update
 * DELETE  /polls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    console.log('Found ' + polls);
    return res.status(200).json(polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    return res.json(poll);
  });
};

// Get polls associated with user.
exports.indexUser = function(req, res) {
    Poll.find({name:req.params.name, name_id:req.params.name_id}, function (err, polls) {
        if(err) return res.send(500, err);
        return res.json(200, polls);
    });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.extend(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};


// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

// Sample data
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
});