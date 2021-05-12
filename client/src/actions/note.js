import axios from 'axios'
import { setAlert } from './alert'
import {
	LOAD_NOTES,
	SET_CURRENT_NOTE,
	NOTE_CREATE,
	NOTE_UPDATE,
	NOTE_DELETE,
	NOTE_FAIL,
} from './types'

const handleNoteError = (error, dispatch) => {
	// Our backend send an array of errors when there is one or more. Show them all as alerts
	if (error.response) {
		const errors = error.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
	} else {
		//in case the error is sent from any other point in the conection
		dispatch(setAlert(error.message, 'danger'))
	}
	dispatch({
		type: NOTE_FAIL,
	})
}

// ######## ACTIONS ########

export const setCurrentNote = (note_id) => async (dispatch) => {
	try {
		dispatch({
			type: SET_CURRENT_NOTE,
			payload: note_id,
		})
	} catch (error) {
		handleNoteError(error, dispatch)
	}
}

// Load all Notes from this user
export const loadNotes = () => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const res = await axios.get('/api/note/all', config)

		dispatch({
			type: LOAD_NOTES,
			payload: res.data,
		})
	} catch (error) {
		handleNoteError(error, dispatch)
	}
}

// Create new Note
export const createNote = (name, text) => async (dispatch) =>
	new Promise(async function (resolve, reject) {
		//this dispatch returns a promise as to be able ti use the res contents after calling it (I need the new post ID)
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		try {
			const body = JSON.stringify({ name, text })
			//res.data contains the new note object as created in the backend
			const res = await axios.post('/api/note', body, config)

			dispatch(setAlert('New Note Created', 'success'))
			dispatch({
				type: NOTE_CREATE,
				payload: res.data, //newly created note object
			})
			//return res.data._id;

			resolve(res.data)
			//dispatch(setCurrentNote(res.data._id));
		} catch (error) {
			handleNoteError(error, dispatch)
			reject(error)
		}
	})

// Update Note
export const updateNote = (note_id, name, text) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const body = JSON.stringify({ note_id, name, text })
		//res.data contains the updated object as in the backend
		const res = await axios.post('/api/note/update', body, config)

		dispatch(setAlert('Note updated', 'success'))
		dispatch({
			type: NOTE_UPDATE,
			payload: res.data,
		})
	} catch (error) {
		handleNoteError(error, dispatch)
	}
}

// Delete Note
export const deleteNote = (note_id) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			note_id: note_id,
		},
	}

	try {
		//res.data contains the deleted note id at res.data._id
		const res = await axios.delete('/api/note/', config)

		dispatch(setAlert('Note Deleted', 'success'))
		dispatch({
			type: NOTE_DELETE,
			payload: res.data,
		})
		//dispatch(setCurrentNote("new"));
	} catch (error) {
		handleNoteError(error, dispatch)
	}
}
