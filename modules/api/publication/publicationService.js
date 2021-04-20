const ArrayError = require('../../../utils/ArrayError')
const Publication = require('./publicationDAO')

class PublicationService {
	async getAllPublicationsForUser(userID) {
		const publications = await Publication.find({ user_id: userID })
		if (!publications) {
			throw new ArrayError([{ msg: 'No publications found for this user' }])
		}
		return publications
	}
}

module.exports = PublicationService
