'use strict';

var _ = require('lodash');
var Keys = require('./keys.model');

// Get list of keyss
exports.index = function(req, res) {
  Keys.find(function (err, keyss) {
    if(err) { return handleError(res, err); }
    return res.json(200, keyss);
  });
};

// Get a single keys
exports.show = function(req, res) {
  Keys.findById(req.params.id, function (err, keys) {
    if(err) { return handleError(res, err); }
    if(!keys) { return res.send(404); }
    return res.json(keys);
  });
};

// Creates a new keys in the DB.
exports.create = function(req, res) {
  Keys.create(req.body, function(err, keys) {
    if(err) { return handleError(res, err); }
    return res.json(201, keys);
  });
};
exports.addcv = function(req, res) {
    console.log("jvuj");
    if(req.body._id) { delete req.body._id; }
    Keys.findById(req.params.id, function (err, keys) {
        if (err) { return handleError(err); }
        if(!keys) { return res.send(404); }
    });
   Keys.findById(req.params.id).cv.insert(res);
};
// Updates an existing keys in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Keys.findById(req.params.id, function (err, keys) {
    if (err) { return handleError(err); }
    if(!keys) { return res.send(404); }
    var updated = _.merge(keys, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, keys);
    });
  });
};

// Deletes a keys from the DB.
exports.destroy = function(req, res) {
  Keys.findById(req.params.id, function (err, keys) {
    if(err) { return handleError(res, err); }
    if(!keys) { return res.send(404); }
    keys.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}