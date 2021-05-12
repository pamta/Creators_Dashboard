const { check } = require('express-validator')
const validateResults = require('../../../middleware/MiddleValidation')
exports.signUp = [
	// Second parameter of check is a custom error message
	// Checks for the value of a json key called "name"
	check('name', 'A name is required').not().isEmpty(),
	check('userName', 'A user name is required').not().isEmpty().not().isEmail(), //to prevent from erroniously use an email as user name
	check('email', 'Please include a valid email').isEmail(),
	check(
		'password',
		'Please enter a password with 8 or more characters'
	).isLength({ min: 8 }),
	validateResults,
]

exports.update = [
	// Second parameter of check is a custom error message
	// Checks for the value of a json key called "name"
	check('name', 'A name is required').not().isEmpty(),
	check('userName', 'A user name is required').not().isEmpty().not().isEmail(), //to prevent from erroniously use an email as user name
	check('email', 'Please include a valid email').isEmail(),
	validateResults,
]

exports.auth = [
	check('userIdentifier', 'Please include a valid email or user name').exists(),
	check('password', 'Please, a password is required').exists(),
	validateResults,
]
