const Note = require('../../../models/Note')

class NoteDAO extends Note {
	constructor(noteDTO) {
		super(noteDTO)
	}

	static find = async (jsonParams) => {
		const note = await note.find(jsonParams).exec()
		return note
	}

	static findOne = async (jsonParams) => {
		const note = await note.findOne(jsonParams).exec()
		return note
	}

	static findByIdAndUpdate = async (noteID, note, callback) => {
		await note.findByIdAndUpdate(noteID, note, { new: true }, callback).exec()
	}

	static remove = async (jsonParams, callback) => {
		await note.remove(jsonParams, callback).exec()
	}

	upload = async () => {
		await this.save()
		return this
	}
}

module.exports = NoteDAO
