const UserYouTubeAnalytics = require('./userYTAnalyticsDAO')
const { google } = require('googleapis')

// Initialize the Youtube API library
const youtube = google.youtube('v3')

class UserYouTubeAnalyticsService {
	async create() {
		// Channel statistics
		const channelRes = await youtube.channels.list({
			mine: true,
			part: 'id,contentDetails,statistics',
		})

		const channelStats =
			channelRes.data.items.length != 0
				? channelRes.data.items[0].statistics
				: {}

		let analyticDTO = {}

		const videosAnalytics = await getVideosAnalytics()

		analyticDTO['viewCount'] = parseInt(channelStats.viewCount) ?? 0
		analyticDTO['subscriberCount'] = parseInt(channelStats.subscriberCount) ?? 0
		analyticDTO['videoCount'] = parseInt(channelStats.videoCount) ?? 0
		analyticDTO['totalVideoViewCount'] = videosAnalytics.totalVideoViewCount
		analyticDTO['totalLikeCount'] = videosAnalytics.totalLikeCount
		analyticDTO['totalDislikeCount'] = videosAnalytics.totalDislikeCount
		analyticDTO['totalFavoriteCount'] = videosAnalytics.totalFavoriteCount
		analyticDTO['totalCommentCount'] = videosAnalytics.totalCommentCount

		const analytic = new UserYouTubeAnalytics(analyticDTO)
		await analytic.upload()

		return analytic
	}
}

async function getVideosAnalytics() {
	const channel = await youtube.channels.list({
		// Setting the "mine" request parameter's value to "true" indicates that
		// you want to retrieve the currently authenticated user's channel.
		mine: true,
		part: 'id,contentDetails',
	})
	let uploadsListId =
		channel.data.items[0].contentDetails.relatedPlaylists.uploads
	// Use the playlist ID to retrieve the list of uploaded videos.
	return await getPlaylistItems(uploadsListId)
}

// Call the Data API to retrieve the items in a particular playlist. In this
// example, we are retrieving a playlist of the currently authenticated user's
// uploaded videos. By default, the list returns the most recent videos first.
async function getPlaylistItems(listId) {
	// See https://developers.google.com/youtube/v3/docs/playlistitems/list
	var res = await youtube.playlistItems.list({
		playlistId: listId,
		part: 'snippet',
	})

	const videoIds = res.data.items.map(
		({ snippet }) => snippet.resourceId.videoId
	)

	// Now that we know the IDs of all the videos in the uploads list,
	// we can retrieve information about each video.
	return await getVideosMetadata(videoIds)
}

// Given an array of video IDs, this function obtains metadata about each
// video and then uses that metadata to display a list of videos.
async function getVideosMetadata(videoIds) {
	// https://developers.google.com/youtube/v3/docs/videos/list
	const res = await youtube.videos.list({
		// The 'id' property's value is a comma-separated string of video IDs.
		id: videoIds.join(','),
		part: 'id,snippet,statistics',
	})

	let totalVideoViewCount = 0
	let totalLikeCount = 0
	let totalDislikeCount = 0
	let totalFavoriteCount = 0
	let totalCommentCount = 0

	if (res.data.items.length == 0) {
		console.log(`This channel doesn't have any videos`)
	} else {
		res.data.items.map(({ id, snippet, statistics }) => {
			totalVideoViewCount += parseInt(statistics.viewCount)
			totalLikeCount += parseInt(statistics.likeCount)
			totalDislikeCount += parseInt(statistics.dislikeCount)
			totalFavoriteCount += parseInt(statistics.favoriteCount)
			totalCommentCount += parseInt(statistics.commentCount)
		})

		const analytics = {
			totalVideoViewCount,
			totalLikeCount,
			totalDislikeCount,
			totalFavoriteCount,
			totalCommentCount,
		}

		console.log('Successfully added all of users YouTube video analytics')
		console.log(analytics)
		return analytics
	}
}

module.exports = UserYouTubeAnalyticsService
