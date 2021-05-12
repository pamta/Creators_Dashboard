const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const config = require('config')
const adminKey = config.get('adminKey')
const SocialNetwork = require('../../../models/SocialNetwork')

// @route POST admin/socialnetworks
// @desct Register a new social network
// @access Private
router.post(
	'/',
	[
		check('adminKey', 'Admin key does not coincide').equals(adminKey),
		check('name', 'Name is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const existingNetwork = await SocialNetwork.findOne({
				name: req.body.name,
			})
			if (existingNetwork) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Network already exists' }] })
			}

			const newSocialNetwork = { name: req.body.name }
			const attributes = [
				'acceptsText',
				'acceptsImage',
				'acceptsVideo',
				'textLimit',
				'imageLimit',
				'videoLimit',
			]

			attributes.forEach((attribute) => {
				if (req.body[attribute]) {
					newSocialNetwork[attribute] = req.body[attribute]
				}
			})

			const socialNetwork = new SocialNetwork(newSocialNetwork)
			await socialNetwork.save()
			res.json(socialNetwork)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('server error')
		}
	}
)

module.exports = router
