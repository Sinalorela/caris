'use strict';

var _ = require('lodash');
var Addcv = require('./addcv.model');
var fs = require('fs');

// Get list of addcvs
exports.index = function(req, res) {
  Addcv.find(function (err, addcvs) {
    if(err) { return handleError(res, err); }
    return res.json(200, addcvs);
  });
};

// Get a single addcv
exports.show = function(req, res) {
  Addcv.findById(req.params.id, function (err, addcv) {
    if(err) { return handleError(res, err); }
    if(!addcv) { return res.send(404); }
    return res.json(addcv);
  });
};

// Creates a new addcv in the DB.
exports.create = function(req, res) {
  Addcv.create(req.body, function(err, addcv) {
    if(err) { return handleError(res, err); }
    return res.json(201, addcv);
  });
};

exports.upload = function(req, res){
    fs.readFile(req.body, function (err, data) {
        console.log(req.body);

        fs.writeFile('cv.txt', req.body, function (err, data) {
            return res.json(200,data);
        });
    });
}
// Updates an existing addcv in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  Addcv.findById(req.params.id, function (err, addcv) {
    if (err) { return handleError(err); }
    if(!addcv) { return res.send(404); }
    var updated = _.merge(addcv, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, addcv);
    });
  });
};

// Deletes a addcv from the DB.
exports.destroy = function(req, res) {
  Addcv.findById(req.params.id, function (err, addcv) {
    if(err) { return handleError(res, err); }
    if(!addcv) { return res.send(404); }
    addcv.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.deleteAll = function(req, res) {
    Addcv.remove(function (err, addcvs) {
        if(err) { return handleError(res, err); }
        return res.json(200, addcvs);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}