const ArrayError = require("../../../utils/ArrayError");
const Publication = require("./publicationDAO");

class PublicationService {

	async getAllPublicationsForUser(userID) {
		const publications = await Publication.find({ user_id: userID });
		if (!publications) {
		throw new ArrayError([{ msg: "No publications found for this user" }]);
		}
		return publications;
	}

	async getPublicationOfUser(publicationID, userID) {
		const publication = await Publication.findOne({
		_id: publicationID,
		user_id: userID,
		});

		if (publication == null) {
			throw new ArrayError([{ msg: "No publications found for this user" }]);
		}

		return publication;
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
  
	async getPostAnalytics(publicationID, userID) {
		const analytics = await Publication.getPostAnalyticsByDate({
		_id: publicationID,
		user_id: userID,
		});
		return analytics;
	}

	async updatePublication(publicationID, publication, callback) {
		await Publication.findByIdAndUpdate(publicationID, publication, callback);
	}

	async addNoteToPublication(userID, publicationID, note_id, callback) {
		const publication = await this.getPublicationOfUser(publicationID, userID)
		if (!publication) {
			throw new ArrayError([{ msg: 'Publication does not exist' }])
		}
		

		// Update publication
		publication.notes = [...publication.notes, note_id]
		publication.updateDate = Date.now()
		console.log("updated publication: ")

		await Publication.findByIdAndUpdate(publicationID, publication, callback)
	}

	async removeNoteFromPublication(userID, publicationID, note_id, callback) {

		const publication = await this.getPublicationOfUser(publicationID, userID)
		if (!publication) {
			throw new ArrayError([{ msg: 'Publication does not exist' }])
		}
		
		// remove note and update publication
		console.log(publication.notes)
		publication.notes.filter(note => note != note_id)
		console.log(publication.notes)

		publication.updateDate = Date.now()
		console.log("removed note from publication: ")

		await Publication.findByIdAndUpdate(publicationID, publication, callback)
	}
}

module.exports = PublicationService;
