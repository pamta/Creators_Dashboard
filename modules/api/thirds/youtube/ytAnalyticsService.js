const YouTubeAnalytics = require('./ytAnalyticsDAO')
const { google } = require('googleapis')

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

		analyticDTO[viewCount] = analytics.viewCount
		analyticDTO[likeCount] = analytics.likeCount
		analyticDTO[dislikeCount] = analytics.dislikeCount
		analyticDTO[favoriteCount] = analytics.favoriteCount
		analyticDTO[commentCount] = analytics.commentCount

		const analytic = new YouTubeAnalytics(analyticDTO)
		await analytic.upload()
		return analytic
	}
}

module.exports = YouTubeAnalyticsService
