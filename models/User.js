const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	registrationDate: {
		type: Date,
		default: Date.now(),
	},
	updateDate: {
		type: Date,
		default: Date.now(),
	},
	analytics: {
		fbUserAnalytics: {
			data: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'analyticsFbPage',
			},
			date: {
				type: Date,
				default: Date.now(),
			},
		},
		ytUserAnalytics: {
			data: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'youtubeUserAnalytic',
			},
			date: {
				type: Date,
				default: Date.now(),
			},
		},
	},
})

module.exports = User = mongoose.model('user', UserSchema)
