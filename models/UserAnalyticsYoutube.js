const mongoose = require('mongoose')

const UserYouTubeAnalyticSchema = new mongoose.Schema({
	viewCount: {
		type: Number,
	},
	subscriberCount: {
		type: Number,
	},
	videoCount: {
		type: Number,
	},
	totalVideoViewCount: {
		type: Number,
	},
	totalLikeCount: {
		type: Number,
	},
	totalDislikeCount: {
		type: Number,
	},
	totalFavoriteCount: {
		type: Number,
	},
	totalCommentCount: {
		type: Number,
	},
})

module.exports = UserYouTubeAnalytic = mongoose.model(
	'youtubeUserAnalytic',
	UserYouTubeAnalyticSchema
)
