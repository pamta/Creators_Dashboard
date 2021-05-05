const YouTubeAnalytics = require('./ytAnalyticsDAO')
const { google } = require('googleapis')
const { analyticsadmin } = require('googleapis/build/src/apis/analyticsadmin')

// Initialize the Youtube API library
const youtube = google.youtube('v3')

class YouTubeAnalyticsService {
	async create(videoID) {
		const res = await youtube.videos.list({
			id: videoID,
			part: 'id,snippet,statistics',
		})
		let analyticDTO = {}

		const analytics = res.data.items[0].statistics

		analyticDTO['viewCount'] = parseInt(analytics.viewCount) ?? 0
		analyticDTO['likeCount'] = parseInt(analytics.likeCount) ?? 0
		analyticDTO['dislikeCount'] = parseInt(analytics.dislikeCount) ?? 0
		analyticDTO['favoriteCount'] = parseInt(analytics.favoriteCount) ?? 0
		analyticDTO['commentCount'] = parseInt(analytics.commentCount) ?? 0

		const analytic = new YouTubeAnalytics(analyticDTO)
		await analytic.upload()

		return analytic
	}
}

module.exports = YouTubeAnalyticsService
