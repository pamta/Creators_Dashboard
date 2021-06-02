const express = require('express')
const router = express.Router()

const auth = require('../../../middleware/auth')
const UserService = require('./userService')
const AnalyticsFbPageService = require('../thirds/facebook/analyticsFbPageService')
const UserYTAnalyticsService = require('../thirds/youtube/userYTAnalyticsService')
const UserTWAnalyticsService = require('../thirds/twitter/analyticsTweetService')
const ytUserSerivce = new UserYTAnalyticsService()
const twUserService = new UserTWAnalyticsService()
const fbPageSerivce = new AnalyticsFbPageService()
const userService = new UserService()
const userValidators = require('./userValidators')

function calculateCompoundAnalytics(facebook, youtube) {
	console.log("In calculate compound")
	console.log(facebook)
	console.log(youtube)
	
	// Objects to calculate compound analytics
	const total_favorite_analytics = {
		fb: 0,
		yt: 0,
		tw: 0,
	}

	const total_like_analytics = {
		fb: 0,
		yt: 0,
		tw: 0,
	}

	const total_comment_analytics = {
		fb: 0,
		yt: 0,
		tw: 0,
	}

	const total_audience_analytics = {
		fb: 0,
		yt: 0,
		tw: 0,
	}

	if (youtube != null) {
		total_favorite_analytics.yt = Number(youtube.totalFavoriteCount)
		total_like_analytics.yt = Number(youtube.totalLikeCount)
		total_comment_analytics.yt = Number(youtube.totalCommentCount)
		total_audience_analytics.yt =
			Number(youtube.subscriberCount) + Number(youtube.totalVideoViewCount)
	}

	if (facebook != null) {
		total_favorite_analytics.fb = Number(
			facebook.page_actions_post_reactions_love_total
		)
		total_like_analytics.fb = Number(
			facebook.page_actions_post_reactions_like_total
		)
		total_comment_analytics.fb = Number(facebook.page_post_engagements)
		total_audience_analytics.fb = Number(facebook.page_engaged_users)
	}

	// Calculate totals
	total_favorite_analytics.total =
		total_favorite_analytics.fb +
		total_favorite_analytics.yt +
		total_favorite_analytics.tw
	total_like_analytics.total =
		total_like_analytics.fb + total_like_analytics.yt + total_like_analytics.tw
	total_comment_analytics.total =
		total_comment_analytics.fb +
		total_comment_analytics.yt +
		total_comment_analytics.tw
	total_audience_analytics.total =
		total_audience_analytics.fb +
		total_audience_analytics.yt +
		total_audience_analytics.tw

	return {
		total_audience_analytics,
		total_favorite_analytics,
		total_like_analytics,
		total_comment_analytics,
	}
}
// route to validate social network user info
// @route  PATCH api/user/updateAnalytics
// @desct  Updates user analytics from social networks
// @access Private/requires token
router.patch(
	'/updateAnalytics',
	[auth, userValidators.facebookInfo, userValidators.twitterInfo],
	async (req, res) => {
		console.log('inside update analytics')
		try {
			const userId = req.user.id
			const { fbPageId, fbPageAccessToken, twConsumerKey, twConsumerSecret } =
				req.body
			const twUserId = req.body.userId
			let user = await userService.getById(userId)
			const dateNow = Date.now()
			let twitterAnalytics = null
			try {
				const fbPageAnalytic = await fbPageSerivce.createPageAnalytic(
					fbPageId,
					fbPageAccessToken
				)
				if (fbPageAnalytic && fbPageAnalytic._id) {
					if (
						user.analytics.fbUserAnalytics &&
						user.analytics.fbUserAnalytics._id
					) {
						fbPageSerivce.remove(user.analytics.fbUserAnalytics._id)
					}
					user.analytics.fbUserAnalytics = {
						data: fbPageAnalytic._id,
						date: dateNow,
					}
				}
			} catch (err) {
				console.log(err)
			}

			try {
				twitterAnalytics = await twUserService.getUserData(
					twConsumerKey,
					twConsumerSecret,
					twUserId
				)
			} catch (err) {
				console.log(err)
			}

			try {
				const ytUserAnalytic = await ytUserSerivce.create()
				if (ytUserAnalytic && ytUserAnalytic._id) {
					if (
						user.analytics.ytUserAnalytics &&
						user.analytics.ytUserAnalytics._id
					) {
						ytUserSerivce.remove(user.analytics.ytUserAnalytics._id)
					}
					user.analytics.ytUserAnalytics = {
						data: ytUserAnalytic._id,
						date: dateNow,
					}
				}
			} catch (err) {}
			await user.save()
			user = await user
				.populate('analytics.fbUserAnalytics.data')
				.populate('analytics.ytUserAnalytics.data')
				.execPopulate()

			const {
				analytics,
				registrationDate,
				updateDate,
				_id,
				name,
				email,
				userName,
			} = user

			const fbUserAnalytics = analytics.fbUserAnalytics
				? analytics.fbUserAnalytics
				: null
			const ytUserAnalytics = analytics.ytUserAnalytics
				? analytics.ytUserAnalytics
				: null

			const compoundUserAnalytics = calculateCompoundAnalytics(
				fbUserAnalytics,
				ytUserAnalytics
			)

			const newAnalytics = {
				fbUserAnalytics,
				ytUserAnalytics,
				twitterAnalytics,
				compoundUserAnalytics,
			}

			let newUser = {
				analytics: newAnalytics,
				registrationDate,
				updateDate,
				_id,
				name,
				email,
				userName,
			}
			console.log('reading new userrrrr ')
			console.log(newUser)
			res.send(newUser)
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
