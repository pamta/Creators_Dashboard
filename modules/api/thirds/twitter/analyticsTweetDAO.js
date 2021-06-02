const TweetAnalytic = require('../../../../models/AnalyticsTwitter')

class TweetAnalyticDAO extends TweetAnalytic {
	constructor(tweetAnalyticDTO) {
		super(tweetAnalyticDTO)
	}

	static find = async (jsonParams) => {
		const tweetAnalytic = await tweetAnalytic.find(jsonParams).exec()
		return tweetAnalytic
	}

	static findOne = async (jsonParams) => {
		const tweetAnalytic = await tweetAnalytic.findOne(jsonParams).exec()
		return tweetAnalytic
	}

	static findByIdAndUpdate = async (
		tweetAnalyticID,
		tweetAnalytic,
		callback
	) => {
		await tweetAnalytic
			.findByIdAndUpdate(tweetAnalyticID, tweetAnalytic, callback)
			.exec()
	}

	static remove = async (jsonParams, callback) => {
		await tweetAnalytic.remove(jsonParams, callback).exec()
	}

	upload = async () => {
		await this.save()
		return this
	}
}

module.exports = TweetAnalyticDAO
