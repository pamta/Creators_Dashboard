const express = require('express')
const router = express.Router()
const path = require('path')
const { google } = require('googleapis')
const { authenticate } = require('@google-cloud/local-auth')

// Initialize the Youtube API library
const youtube = google.youtube('v3')

// @route  POST youtube/upload
// @desct  Upload a user's video to YouTube
// @access Public/non-authentication/no-token
router.post('/', async (req, res) => {
	try {
		const { title, description, privacyStatus } = req.body
		// Obtain user credentials to use for the request
		const auth = await authenticate({
			keyfilePath: path.join(__dirname, './oauth2.keys.json'),
			scopes: [
				'https://www.googleapis.com/auth/youtube.upload',
				'https://www.googleapis.com/auth/youtube',
			],
		})
		google.options({ auth })

		const fileSize = fs.statSync(fileName).size
		const res = await youtube.videos.insert(
			{
				part: 'id,snippet,status',
				notifySubscribers: false,
				requestBody: {
					snippet: {
						title,
						description,
					},
					status: {
						privacyStatus,
					},
				},
				media: {
					body: fs.createReadStream(fileName),
				},
			},
			{
				// Use the `onUploadProgress` event from Axios to track the
				// number of bytes uploaded to this point.
				onUploadProgress: (evt) => {
					const progress = (evt.bytesRead / fileSize) * 100
					readline.clearLine(process.stdout, 0)
					readline.cursorTo(process.stdout, 0, null)
					process.stdout.write(`${Math.round(progress)}% complete`)
				},
			}
		)
		console.log('\n\n')
		console.log(res.data)
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
