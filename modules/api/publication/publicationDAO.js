const Publication = require('../../../models/Publication')

class PublicationDAO extends Publication {
	constructor(publicationDTO) {
		super(publicationDTO)
	}

	static find = async (jsonParams) => {
		const publication = await Publication.find(jsonParams).exec()
		return publication
	}

	static findOne = async (jsonParams) => {
		const publication = await Publication.findOne(jsonParams).exec()
		return publication
	}

	static findByIdAndUpdate = async (publicationID, publication, callback) => {
		await Publication.findByIdAndUpdate(
			publicationID,
			publication,
			callback
		).exec()
	}

	static remove = async (jsonParams, callback) => {
		await Publication.remove(jsonParams, callback).exec()
	}

	upload = async () => {
		await this.save()
		return this
	}
}

module.exports = PublicationDAO
