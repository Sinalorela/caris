    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var AddcvSchema = new Schema({
        firstname:String,
        surname:String,
        pathname: String
    });

    module.exports = mongoose.model('Addcv', AddcvSchema);