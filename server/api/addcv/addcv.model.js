    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var AddcvSchema = new Schema({
        firstname:String,
        surname:String,
        pathname: String,
        skills: String,
        keysref: [{ type: Schema.Types.ObjectId, ref: 'Keys'}]
    });

    module.exports = mongoose.model('Addcv', AddcvSchema);