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

	async updatePublicationName(userID, publicationID, name, callback) {
		const publication = await this.getPublicationOfUser(publicationID, userID)
		if (!publication) {
			throw new ArrayError([{ msg: 'Publication does not exist' }])
		}

		// Update publication
		publication.name = name
		publication.updateDate = Date.now()

		await Publication.findByIdAndUpdate(publicationID, publication, callback)
	}

	async updatePublicationText(userID, publicationID, text, callback) {
		const publication = await this.getPublicationOfUser(publicationID, userID)
		if (!publication) {
			throw new ArrayError([{ msg: 'Publication does not exist' }])
		}

		// Update publication
		publication.text = text
		publication.updateDate = Date.now()

		await Publication.findByIdAndUpdate(publicationID, publication, callback)
	}
}

module.exports = PublicationService