const mongoose = require('mongoose')

const AnalyticsFbPostSchema = new mongoose.Schema({
	post_engaged_users: {
		type: String,
	},
	post_negative_feedback: {
		type: String,
	},
	post_comments: {
		type: Number,
	},
	post_negative_feedback_unique: {
		type: String,
	},
	post_negative_feedback_by_type: {
		type: String,
	},
	post_negative_feedback_by_type_unique: {
		type: String,
	},
	post_engaged_fan: {
		type: String,
	},
	post_clicks: {
		type: String,
	},
	post_clicks_unique: {
		type: String,
	},
	post_clicks_by_type: {
		type: String,
	},
	post_clicks_by_type_unique: {
		type: String,
	},
	post_reactions_like_total: {
		type: String,
	},
	post_reactions_love_total: {
		type: String,
	},
	post_reactions_wow_total: {
		type: String,
	},
	post_reactions_haha_total: {
		type: String,
	},
	post_reactions_sorry_total: {
		type: String,
	},
	post_reactions_anger_total: {
		type: String,
	},
	post_reactions_by_type_total: {
		type: String,
	},
})

module.exports = AnalyticsFbPost = mongoose.model(
	'analyticsFbPost',
	AnalyticsFbPostSchema
)
