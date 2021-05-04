const mongoose = require('mongoose')

const YouTubeAnalyticSchema = new mongoose.Schema({
	viewCount: {
		type: Number,
	},
	likeCount: {
		type: Number,
	},
	dislikeCount: {
		type: Number,
	},
	favoriteCount: {
		type: Number,
	},
	commentCount: {
		type: Number,
	},
})

module.exports = YouTubeAnalytic = mongoose.model(
	'youtubeAnalytic',
	YouTubeAnalyticSchema
)
