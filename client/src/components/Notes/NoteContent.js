import { useState } from "react";
import React, { useEffect } from "react";
//redux
import {useSelector, useDispatch} from "react-redux";
import {createNote, updateNote, deleteNote} from "../../actions/note"

const NoteContent = ( ) => {
    const [name, setName] = useState();
	const [text, setText] = useState();

    const dispatch = useDispatch();

    //fetch the storee notes
    const notes = useSelector(state => state.note);

    const saveNote = (name, text) => { 
        if(notes.currentNote == (null || "new")){
            dispatch(createNote(name, text));
        }else{
            dispatch(updateNote(notes.currentNote, name, text));
        }
	};

    const deleteCurrentNote = () => { 
        dispatch(deleteNote(notes.currentNote));
	};
    

    useEffect(() => {
            const selected_note = notes.currentNote == (null || "new") ? null : notes.notes.find( 
                (note) => { 
                    return note._id == notes.currentNote;
                })            
            if(selected_note){
                setName(selected_note.name);
                setText(selected_note.text);
            }else{
                setName("");
                setText("");
            }
        }, [notes.currentNote]);

	return (
		<div className="relative flex flex-col bg-white w-full">
            <div className="pt-10 px-5 text-gray-900 h-full">
                    <div className="relative mb-3">
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            required 
                            type="text"
                            className="border-0 border-solid border-b-2 border-red-500 w-full text-3xl md:text-4xl xl:text-5xl"
                            placeholder="Title"
                            value={name}
                        />
                    </div>
                    <div className="relative mb-3 h-4/5">
                        <textarea
                            onChange={(e) => setText(e.target.value)}
                            required
                            className="resize-none h-full w-full text-xl md:text-2xl p-3"
                            rows="20"
                            cols="28"
                            placeholder="Note"
                            value={text}
                        />
                    </div>
                    <div className="text-center mt-8">
                        <button
                            onClick={(e) => {e.preventDefault(); saveNote(name, text)} }
                            className="rounded-lg bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            >
                            Save
                        </button>
                        {
                            notes.currentNote != ("new" || null) &&
                                <button
                                onClick={(e) => {e.preventDefault(); deleteCurrentNote()} }
                                className="rounded-lg bg-red-900 text-white active:bg-red-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                >
                                Delete
                            </button>
                        }
                    </div>
            </div>
        </div>
	)
}


export default NoteContent