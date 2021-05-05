const ArrayError = require('../../../utils/ArrayError')
const Note = require('./noteDAO')

class NoteService {
	async getAllNotesForUser(userID) {
		const notes = await Note.find({ user_id: userID })
		if (!notes) {
			throw new ArrayError([{ msg: 'No notes found for this user' }])
		}
		return notes
	}

	async getNoteOfUser(noteID, userID) {
		const note = await Note.findOne({
			_id: noteID,
			user_id: userID,
		})
		if (!note) {
			throw new ArrayError([{ msg: 'No notes found for this user' }])
		}
		return note
	}

	async updateNote(noteID, note, callback) {
		await Note.findByIdAndUpdate(noteID, note, callback)
	}
}

module.exports = NoteService