const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const path = require('path')
const { google } = require('googleapis')
const fs = require('fs')
const http = require('http')
const url = require('url')
const opn = require('open')
const destroyer = require('server-destroy')

const scopes = [
	'https://www.googleapis.com/auth/yt-analytics.readonly',
	'https://www.googleapis.com/auth/youtube.readonly',
	'https://www.googleapis.com/auth/youtube.upload',
	'https://www.googleapis.com/auth/youtube',
]

// @route  POST youtube/auth/
// @desct  Authenticate YouTube client using Google account
// @access Private/requires token
router.post('/', async (req, res) => {
	const keyPath = path.join(__dirname, '../../oauth2.keys.json')
	let keys = { redirect_uris: [''] }
	if (fs.existsSync(keyPath)) {
		keys = require(keyPath).installed
	}

	// Create a new OAuth2 client with the configured keys.
	const oauth2Client = new google.auth.OAuth2(
		keys.client_id,
		keys.client_secret,
		keys.redirect_uris[3]
	)

	/**
	 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
	 */
	google.options({ auth: oauth2Client })

	let authenticatedClient

	await authenticate(scopes, oauth2Client)
		.then((client) => {
			console.log('Successfully retrieved YouTube client ', client.credentials)
			authenticatedClient = client.credentials
		})
		.catch((e) => console.log(e))

	// res.send('Successfully authenticaded YouTube client')
	res.send(authenticatedClient)
})

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
async function authenticate(scopes, oauth2Client) {
	return new Promise((resolve, reject) => {
		// grab the url that will be used for authorization
		const authorizeUrl = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes.join(' '),
		})
		const server = http
			.createServer(async (req, res) => {
				try {
					if (req.url.indexOf('/oauth2callback') > -1) {
						const qs = new url.URL(req.url, 'http://localhost:4000')
							.searchParams
						res.end(
							`Authentication successful! Creator's Dashboard will now have access to your YouTube account. Please return to the dashboard.`
						)
						server.destroy()
						const { tokens } = await oauth2Client.getToken(qs.get('code'))
						oauth2Client.credentials = tokens // eslint-disable-line require-atomic-updates
						resolve(oauth2Client)
					}
				} catch (e) {
					reject(e)
				}
			})
			.listen(4000, () => {
				// Open the browser to the authorize url to start the workflow
				opn(authorizeUrl, { wait: false }).then((cp) => cp.unref())
			})
		destroyer(server)
	})
}

module.exports = router
