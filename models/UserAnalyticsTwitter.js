const mongoose = require('mongoose')

const UserTwitterAnalyticSchema = new mongoose.Schema({
	followers_count: {
		type: Number,
	},
	friends_count: {
		type: Number,
	},
	listed_count: {
		type: Number,
	},
	favourites_count: {
		type: Number,
	},
	statuses_count: {
		type: Number,
	},
})

module.exports = UserTwitterAnalytic = mongoose.model(
	'userTwitterAnalytic',
	UserTwitterAnalyticSchema
)
