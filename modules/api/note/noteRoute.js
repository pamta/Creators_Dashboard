const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')

// Exporting two objects
const { check, validationResult } = require('express-validator')

// Returns a moongose model of the user
const User = require('../../../models/User')
const Note = require('../../../models/Note')

const handleError = (res, status, msg, err = null) => {
	if (!res.headersSent) {
		if (err) {
			console.error(err)
		}
		return res.status(status).json({ errors: [{ msg: msg }] })
	}

	if (err) {
		console.error(err)
	}
}

// ######## ROUTES ########

// Given a JSON web token , it returns all the user's notes
// @route  GET api/note/all
// @access Private/requires token
router.get('/all', auth, async (req, res) => {
	try {
		const notes = await Note.find({ user_id: req.user.id })
		return res.json(notes)
	} catch (err) {
		return handleError(res, 500, 'Server Error', err)
	}
})

// Given a JSON web token , it returns a given user's note
// @route  GET api/note
// @access Private/requires token
router.get('/', auth, async (req, res) => {
	try {
		const note_id = req.header('note_id')
		const note = await Note.findOne({
			_id: note_id,
			user_id: req.user.id,
		}).exec()
		return res.json(note)
	} catch (err) {
		return handleError(res, 500, 'Server Error', err)
	}
})

// route to create a new note
// @route  POST api/note
// @access private, requires a user token
// responds with the newly created note object
router.post(
	'/',
	auth,
	[
		// Second parameter of check is a custom error message
		check('name', 'A Title is required').not().isEmpty(),
	],
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				// 400 is for a bad request
				errors: errors.array(),
			})
		}

		//we get the alredy checked payload
		const { name, text, publication } = req.body

		try {
			//user exist in req because of the auth middleware
			const user_id = req.user.id

			// All note must be related to a user, so we check if there's a user with that id.
			let userFound = await User.findById(user_id).exec()

			if (!userFound) {
				return handleError(res, 400, 'User non existent')
			}

			//save current date in the created note
			const creationDate = Date.now()
			const updateDate = creationDate

			note = new Note({
				user_id,
				name,
				text,
				publication,
				creationDate,
				updateDate,
			})

			note.save((err, note) => {
				if (err) {
					return handleError(res, 500, `DB error ${err}`, err)
				}
				return res.json(note)
			})
		} catch (err) {
			return handleError(res, 500, 'Server Error', err)
		}
	}
)

// route to update text content of a note
// @route  POST api/note/update
// @access private, requires a user token
// responds with updated note object
router.post(
	'/update',
	auth,
	[
		// Second parameter of check is a custom error message
		check('note_id', 'A note is required').not().isEmpty(),
		check('name', 'A Title is required').not().isEmpty(),
		check('text', 'Text content is required').not().isEmpty(),
	],
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				// 400 is for a bad request
				errors: errors.array(),
			})
		}

		//we get the alredy checked payload
		const { note_id, name, text } = req.body

		try {
			const noteFound = await Note.findOne({
				_id: note_id,
				user_id: req.user.id,
			}).exec()
			if (!noteFound) {
				return handleError(res, 400, 'Note does not exist')
			}

			//UPDATE NOTE
			noteFound.name = name
			noteFound.text = text
			noteFound.updateDate = Date.now()

			noteFound.save((err, note) => {
				if (err) {
					return handleError(res, 500, `DB error ${err}`, err)
				}
				//responds with the updated note object
				return res.json(note)
			})
		} catch (err) {
			return handleError(res, 500, 'Server Error', err)
		}
	}
)

//DELETE ROUTES

// @route  DELETE api/note
// @desct  Delete existing note
// @access Private/requires token and note_id in headder
router.delete('/', auth, async (req, res) => {
	try {
		const note_id = req.header('note_id')
		const note = await Note.findOne({
			_id: note_id,
			user_id: req.user.id,
		}).exec()

		if (!note) {
			return handleError(res, 400, err, 'Note does not exist')
		}

		await Note.remove({ _id: note_id, user_id: req.user.id }, (err, doc) => {
			if (err) {
				return handleError(res, 500, `DB error ${err}`, err)
			}
		}).exec()

		//responds with the id of the deleted note
		return res.json({ _id: note_id })
	} catch (err) {
		return handleError(res, 500, 'Server Error', err)
	}
})

module.exports = router
