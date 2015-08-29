'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
	name: String,
	name_id: String,
	question: String,
	options: Array,
	create_at: Number
});

module.exports = mongoose.model('Poll', PollSchema);