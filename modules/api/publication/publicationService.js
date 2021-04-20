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

	async getPublicationOfUser(publicationID, userID) {
		const publication = await Publication.findOne({
			_id: publicationID,
			user_id: userID,
		})
		if (!publication) {
			throw new ArrayError([{ msg: 'No publications found for this user' }])
		}
		return publication
	}
}

module.exports = PublicationService
