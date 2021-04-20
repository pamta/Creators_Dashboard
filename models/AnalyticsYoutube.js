const mongoose = require('mongoose')

const YouTubeAnalyticSchema = new mongoose.Schema({
	view_count: {
		type: Number,
	},
	like_count: {
		type: Number,
	},
	dislike_count: {
		type: Number,
	},
	favorite_count: {
		type: Number,
	},
	comment_count: {
		type: Number,
	},
})

module.exports = Note = mongoose.model('youtubeAnalytic', YouTubeAnalyticSchema)
