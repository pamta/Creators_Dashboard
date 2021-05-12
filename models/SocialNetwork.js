const mongoose = require('mongoose')

const SocialNetworkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	acceptsText: {
		type: Boolean,
		required: true,
		default: false,
	},
	acceptsImage: {
		type: Boolean,
		required: true,
		default: false,
	},
	acceptsVideo: {
		type: Boolean,
		required: true,
		default: false,
	},
	textLimit: {
		type: Number,
	},
	imageLimit: {
		type: Number,
	},
	videoLimit: {
		type: Number,
	},
})

module.exports = SocialNetwork = mongoose.model(
	'socialNetwork',
	SocialNetworkSchema
)
