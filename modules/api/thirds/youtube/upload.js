const express = require('express')
const router = express.Router()
const path = require('path')
const { google } = require('googleapis')
const fs = require('fs')
const readline = require('readline')
const https = require('https')
const auth = require('../../../../middleware/auth')

const Publication = require('../../publication/publicationDAO')
const YouTubeAnalytics = require('./ytAnalyticsService')
const PublicationSN = require('../../publication/publicationInSNService')
const publicationSnService = new PublicationSN()
const youtubeAnalyticsService = new YouTubeAnalytics()

const SocialNetwork = require('../../../../models/SocialNetwork')

let youtubeModel = null
const getYT = async () => {
	if (!youtubeModel) {
		youtubeModel = await SocialNetwork.findOne({ name: 'YouTube' })
	}
	return youtubeModel
}

// Update publication in our DB with YouTube post id and add its analytics
const updatePublicationWithAnalytics = async (publication, videoID) => {
	const yt = await getYT()
	const publicationInSn = await publicationSnService.create(yt.id, videoID)

	await youtubeAnalyticsService.create(videoID)
	const ytAnalytic = await youtubeAnalyticsService.create(videoID)

	await publicationSnService.pushAnalyticRef(publicationInSn.id, ytAnalytic.id)

	publication.publicationsToSocialNetworks.push(publicationInSn.id)
	await publication.save()
}

// Initialize the Youtube API library
const youtube = google.youtube('v3')

async function createFile(fileURL) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream('file.mov')
		const req = https.get(fileURL, async function (response) {
			response.pipe(file)
			file.on('finish', async function () {
				file.close()
				resolve(file)
			})
		})
		req.on('error', reject)
	})
}

// @route  POST youtube/upload
// @desct  Upload a user's video to YouTube
// @access Private/requires token
router.post('/', auth, async (req, res) => {
	try {
		const {
			fileURL,
			title,
			description,
			privacyStatus,
			publicationID,
		} = req.body
		await createFile(fileURL)

		const publication = await Publication.findOne({
			_id: publicationID,
			user_id: req.user.id,
		})

		const fileSize = fs.statSync('file.mov').size
		const filePath = path.join(__dirname, '../../../../file.mov')
		const video = await youtube.videos
			.insert(
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
						body: fs.createReadStream(filePath),
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
			.catch((e) => console.log(e))

		fs.unlinkSync(filePath)

		console.log('\n\n')
		console.log(video.data)

		const videoID = video.data.id

		await updatePublicationWithAnalytics(publication, videoID)
		res.send(video.data)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
