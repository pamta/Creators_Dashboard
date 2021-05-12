// Pros: Abstraction in the data layer for easy modification.
// Cons: With mongoose, a little redundant, yet small.

const User = require('../../../models/User')

class UserDAO extends User {
	constructor(userDTO) {
		super(userDTO)
	}

	static findOne = async (jsonParams) => {
		const user = await User.findOne(jsonParams).exec()
		return user
	}

	static findById = async (userID) => {
		const user = await User.findById(userID).exec()
		return user
	}

	static findByIdAndUpdate = async (userID, userDTO, callback) => {
		await User.findByIdAndUpdate(userID, userDTO, callback).exec()
	}

	static remove = async (userID, callback) => {
		await User.remove({ _id: userID }, callback).exec()
	}

	static findByIdAndSelect = async (userID, selection) => {
		// The middleware auth modifies the request to have the user id if it has a correct token in the header
		// Do not pass the password.
		const user = await User.findById(userID).select(selection)
		return user
	}

	upload = async () => {
		await this.save()
		return this
	}
}

module.exports = UserDAO
