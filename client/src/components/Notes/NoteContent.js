import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { createNote, updateNote, deleteNote } from '../../actions/note'

const NoteContent = () => {
	const [name, setName] = useState()
	const [text, setText] = useState()

	const dispatch = useDispatch()
	let history = useHistory()

	//fetch the storee notes
	const notes = useSelector((state) => state.note)
	let { id } = useParams() //get the params from the url

	const saveNote = (name, text) => {
		if (id == (null || 'new')) {
			dispatch(createNote(name, text)).then((note_id) => {
				console.log('returned new id: ' + note_id)
				history.push(`/notes/${note_id}`)
			})

			//some how get the id from the dispatch
			//history.push("/notes/new");
		} else {
			dispatch(updateNote(id, name, text))
		}
	}

	const deleteCurrentNote = () => {
		dispatch(deleteNote(id))
		history.push('/notes/new')
	}

	useEffect(() => {
		const selected_note = notes.notes.find((note) => {
			return note._id == id
		})
		console.log(selected_note)
		if (selected_note) {
			setName(selected_note.name)
			setText(selected_note.text)
		} else {
			setName('')
			setText('')
		}
	}, [id, notes.notes])

	return (
		<div className='relative flex flex-col bg-white w-full'>
			<div className='pt-10 px-5 text-gray-900 h-full'>
				<div className='relative mb-3'>
					<input
						onChange={(e) => setName(e.target.value)}
						type='text'
						className='border-0 border-solid border-b-2 border-red-500 w-full text-2xl md:text-3xl xl:text-4xl'
						placeholder='Title'
						value={name}
					/>
				</div>
				<div className='relative mb-3 h-4/5'>
					<textarea
						onChange={(e) => setText(e.target.value)}
						className='resize-none h-full w-full text-xl md:text-2xl p-3'
						rows='20'
						cols='28'
						placeholder='Note'
						value={text}
					/>
				</div>
				<div className='text-center mt-8'>
					<button
						onClick={(e) => {
							e.preventDefault()
							saveNote(name, text)
						}}
						className='rounded-lg bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4'
						type='button'
						style={{ transition: 'all .15s ease' }}
					>
						Save
					</button>
					{id != ('new' || null) && (
						<button
							onClick={(e) => {
								e.preventDefault()
								deleteCurrentNote()
							}}
							className='rounded-lg bg-red-900 text-white active:bg-red-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4'
							type='button'
							style={{ transition: 'all .15s ease' }}
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default NoteContent
