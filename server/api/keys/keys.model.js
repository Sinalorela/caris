'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KeysSchema = new Schema({
  name: String,
   cv:[{ firstname:String,
    surname:String,
    pathname: String}]
//  cvref: [{ type: Schema.Types.ObjectId, ref: 'Addcv'}]
});

module.exports = mongoose.model('Keys', KeysSchema);