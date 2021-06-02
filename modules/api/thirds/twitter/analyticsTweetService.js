const ArrayError = require('../../../../utils/ArrayError')
const TweetAnalytic = require('./analyticsTweetDAO')
const axios = require('axios')
const oauth1a = require('axios-oauth-1.0a')
const helper = require('../../../../utils/Oauth1Helper')

class TweetAnalyticService {
	async getAllTweetAnalyticsForUser(userID) {
		const tweetAnalytics = await TweetAnalytic.find({ user_id: userID })
		if (!tweetAnalytics) {
			throw new ArrayError([{ msg: 'No tweetAnalytics found for this user' }])
		}
		return tweetAnalytics
	}

	async getTweetAnalyticOfUser(tweetAnalyticID, userID) {
		const tweetAnalytic = await TweetAnalytic.findOne({
			_id: tweetAnalyticID,
			user_id: userID,
		})

		if (tweetAnalytic == null) {
			throw new ArrayError([{ msg: 'No tweetAnalytics found for this user' }])
		}

		return tweetAnalytic
	}

	async updateTweetAnalyticName(userID, tweetAnalyticID, name, callback) {
		const tweetAnalytic = await this.getTweetAnalyticOfUser(
			tweetAnalyticID,
			userID
		)
		if (!tweetAnalytic) {
			throw new ArrayError([{ msg: 'TweetAnalytic does not exist' }])
		}

		// Update tweetAnalytic
		tweetAnalytic.name = name
		tweetAnalytic.updateDate = Date.now()

		await TweetAnalytic.findByIdAndUpdate(
			tweetAnalyticID,
			tweetAnalytic,
			callback
		)
	}

	async updateTweetAnalyticText(userID, tweetAnalyticID, text, callback) {
		const tweetAnalytic = await this.getTweetAnalyticOfUser(
			tweetAnalyticID,
			userID
		)
		if (!tweetAnalytic) {
			throw new ArrayError([{ msg: 'TweetAnalytic does not exist' }])
		}

		// Update tweetAnalytic
		tweetAnalytic.text = text
		tweetAnalytic.updateDate = Date.now()

		await TweetAnalytic.findByIdAndUpdate(
			tweetAnalyticID,
			tweetAnalytic,
			callback
		)
	}

	async updateTweetAnalytic(tweetAnalyticID, tweetAnalytic, callback) {
		await TweetAnalytic.findByIdAndUpdate(
			tweetAnalyticID,
			tweetAnalytic,
			callback
		)
	}

	async getUserData(twConsumerKey, twConsumerSecret, userId) {
		const client = axios.create()
		oauth1a.default(client, {
			key: twConsumerKey,
			secret: twConsumerSecret,
			algorithm: 'HMAC-SHA1',
		})

		client
			.request({
				url: 'https://api.twitter.com/1.1/users/lookup.json?user_id=' + userId,
				method: 'get',
			})
			.then(function (res) {
				let data = res.data[0]
				let processedData = {
					followers_count: data.followers_count,
					friends_count: data.friends_count,
					listed_count: data.listed_count,
					favourites_count: data.favourites_count,
					statuses_count: data.statuses_count,
				}
				console.log(processedData)
				return processedData
			})
			.catch(function (e) {
				return e
			})
	}
}

module.exports = TweetAnalyticService
