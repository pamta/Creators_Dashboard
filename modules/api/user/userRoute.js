const express = require('express')
const router = express.Router()

const auth = require('../../../middleware/auth')
const UserService = require('./userService')
const AnalyticsFbPageService = require('../thirds/facebook/analyticsFbPageService')
const UserYTAnalyticsService = require('../thirds/youtube/userYTAnalyticsService')
const ytUserSerivce = new UserYTAnalyticsService()
const fbPageSerivce = new AnalyticsFbPageService()
const userService = new UserService()
const userValidators = require('./userValidators')
// route to validate social network user info
// @route  PATCH api/user/updateAnalytics
// @desct  Updates user analytics from social networks
// @access Private/requires token
router.patch(
	'/updateAnalytics',
	[auth, userValidators.facebookInfo],
	async (req, res) => {
		try {
			const userId = req.user.id
			const { fbPageId, fbPageAccessToken } = req.body
			const user = await userService.deleteUserAnalytics(userId)
			const dateNow = Date.now()

			const fbPageAnalytic = await fbPageSerivce.createPageAnalytic(
				fbPageId,
				fbPageAccessToken
			)
			//const ytUserAnalytic = await ytUserSerivce.create()
			const userAnalytics = {
				fbUserAnalytics: {
					data: fbPageAnalytic._id,
					date: dateNow,
				},
				ytUserAnalytics: {
					data: null,
					date: dateNow,
				},
			}

			user.analytics = userAnalytics
			await user.save()
			res.send(user)
		} catch (err) {
			if (err.name == 'ArrayError') {
				return res.status(400).json({ errors: err.errors })
			}
			console.error(err)
			res.status(500).send('Server error')
		}
	}
)

// route to create a new user
// @route  POST api/user
// @desct  Register user
// @access Public/non-authentication/no-token
router.post('/', userValidators.signUp, async (req, res) => {
	try {
		token = await userService.signUp(req.body)
		res.json({ token })
	} catch (err) {
		if (err.name == 'ArrayError') {
			return res.status(400).json({ errors: err.errors })
		}
		console.error(err)
		res.status(500).send('Server error')
	}
})

// @route  POST api/user/update
// @desct  Update existing user's data
// @access Private/requires token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
// Given a JSON web token, it updates a user if the token is valid and corresponds to the user id
router.post('/update', auth, userValidators.update, async (req, res) => {
	try {
		userService.update(req.user.id, req.body)
		res.send('User updated')
	} catch (err) {
		if (err.name == 'ArrayError') {
			return res.status(400).json({ errors: err.errors })
		}
		console.error(err)
		res.status(500).send('Server error')
	}
})

// @route  POST api/user/
// @desct  Delete existing user profile
// @access Private/requires token
// Passing the 'auth' middleware will execute the middleware function that will be executed before the callback.
// Given a JSON web token, will delete a user if the token is valid and corresponds to the user id
router.delete('/', auth, async (req, res) => {
	try {
		userService.delete(req.user.id)
		res.send('User deleted')
	} catch (err) {
		if (err.name == 'ArrayError') {
			return res.status(400).json({ errors: err.errors })
		}
		console.error(err)
		res.status(500).send('Server error')
	}
})

module.exports = router
