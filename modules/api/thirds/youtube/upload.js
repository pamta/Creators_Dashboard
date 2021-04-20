const express = require('express')
const router = express.Router()
const path = require('path')
const { google } = require('googleapis')
const fs = require('fs')
const readline = require('readline')
const https = require('https')

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
router.post('/', async (req, res) => {
	try {
		const { fileURL, title, description, privacyStatus } = req.body
		await createFile(fileURL)

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
		res.send(video.data)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
