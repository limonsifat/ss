const mongoose = require('mongoose');

// Our Schema
const sessionSchema = new mongoose.Schema({
	userid: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Session', sessionSchema);