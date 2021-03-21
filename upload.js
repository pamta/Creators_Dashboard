const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { google } = require('googleapis')
const { authenticate } = require('@google-cloud/local-auth')
const https = require('https') // or 'https' for https:// URLs

// initialize the Youtube API library
const youtube = google.youtube('v3')

async function createFile(fileURL, fileName) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(fileName + '.mov')
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

// very basic example of uploading a video to youtube
async function runSample(fileURL, fileName) {
	// Obtain user credentials to use for the request
	const auth = await authenticate({
		keyfilePath: path.join(__dirname, './oauth2.keys.json'),
		scopes: [
			'https://www.googleapis.com/auth/youtube.upload',
			'https://www.googleapis.com/auth/youtube',
		],
	})
	google.options({ auth })

	await createFile(fileURL, fileName)

	const fileSize = fs.statSync(fileName + '.mov').size
	const filePath = path.join(__dirname, './' + fileName + '.mov')
	const res = await youtube.videos
		.insert(
			{
				part: 'id,snippet,status',
				notifySubscribers: false,
				requestBody: {
					snippet: {
						title: 'Testing',
						description: 'Testing YouTube upload',
					},
					status: {
						privacyStatus: 'private',
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
	console.log(res.data)
	return res.data
}

if (module === require.main) {
	const fileURL = process.argv[2]
	const fileName = process.argv[3]
	runSample(fileURL, fileName).catch(console.error)
}

module.exports = runSample
