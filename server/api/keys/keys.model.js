'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KeysSchema = new Schema({
  name: String,
   cv : [{
       firstname: String,
       surname: String,
       pathName: String
   }]
});

module.exports = mongoose.model('Keys', KeysSchema);