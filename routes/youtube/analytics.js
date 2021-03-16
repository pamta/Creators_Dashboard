const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const path = require('path')
const { google } = require('googleapis')
const { authenticate } = require('@google-cloud/local-auth')

// Initialize the Youtube API library
const youtube = google.youtube('v3')

// @route  GET socialauth/youtube/analytics/videos
// @desct  Get all user's videos analytics
// @access Prrivate/requires token
router.get('/videos', auth, async (req, res) => {
	try {
		// Obtain user credentials to use for the request
		const auth = await authenticate({
			keyfilePath: path.join(__dirname, '../../oauth2.keys.json'),
			scopes: [
				'https://www.googleapis.com/auth/yt-analytics.readonly',
				'https://www.googleapis.com/auth/youtube.readonly',
			],
		})
		google.options({ auth })

		const response = await youtube.channels.list({
			// Setting the "mine" request parameter's value to "true" indicates that
			// you want to retrieve the currently authenticated user's channel.
			mine: true,
			part: 'id,contentDetails',
		})

		// We need the channel's channel ID to make calls to the Analytics API.
		// The channel ID value has the form "UCdLFeWKpkLhkguiMZUp8lWA".
		// let channelId = res.data.items[0].id

		// Retrieve the playlist ID that uniquely identifies the playlist of
		// videos uploaded to the authenticated user's channel. This value has
		// the form "UUdLFeWKpkLhkguiMZUp8lWA".
		let uploadsListId =
			response.data.items[0].contentDetails.relatedPlaylists.uploads
		// Use the playlist ID to retrieve the list of uploaded videos.
		await getPlaylistItems(uploadsListId)
		res.send('success')
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})
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
	await getVideoMetadata(videoIds)
}

// Given an array of video IDs, this function obtains metadata about each
// video and then uses that metadata to display a list of videos.
async function getVideoMetadata(videoIds) {
	// https://developers.google.com/youtube/v3/docs/videos/list
	var res = await youtube.videos.list({
		// The 'id' property's value is a comma-separated string of video IDs.
		id: videoIds.join(','),
		part: 'id,snippet,statistics',
	})

	if (res.data.items.length == 0) {
		console.log(`This channel doesn't have any videos`)
	} else {
		const videAnalytics = res.data.items.map(({ id, snippet, statistics }) => {
			return {
				videoID: id,
				title: snippet.title,
				description: snippet.description,
				channel: {
					id: snippet.channelId,
					title: snippet.channelTitle,
				},
				statistics,
			}
		})

		console.log('---> Analytics')
		console.log(videAnalytics)
	}
}

module.exports = router
