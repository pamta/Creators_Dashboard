
//React
import { useState } from "react";
import React,  { useCallback, useEffect } from "react";
import useWindowSize from '../../lib/useWindowSize'
import NoteContent from '../Notes/NoteContent'
//redux
import {useSelector, useDispatch} from "react-redux";
import {createNote, setCurrentNote} from "../../actions/note"

const NotesPage = () => {
    const dispatch = useDispatch();

    //fetch the storee notes
    const notes = useSelector(state => state.note);

    const isMobile = useWindowSize().width <= 768
    const isLarge = useWindowSize().width <= 1280

    const newNote = (e) => {
        dispatch(setCurrentNote("new"));
		// if(!loading){
		// 	dispatch(createNote(name, ""));
		// }
	};

    const selectNote = (e) => {
        console.log(`selected ID ==> ${e}`);
        dispatch(setCurrentNote(e));
	};

    const selectedNoteBG = (id) => {
        if(id == notes.currentNote){
            return " bg-yellow-300 bg-opacity-40"
        } else{
            return ""
        }
	};

    // useEffect(() => {
	// }, []); //we need to update the component state when user is updated from the store

    const elementsList = (list) => {
        console.log(list)
        if(list){
            return list.map((note, index) => {
                return  <div onClick={(e) => selectNote(note._id) } className={
                                "flex flex-row p-2 border-0 border-b border-gray-400 border-opacity-50 hover:bg-yellow-300 hover:bg-opacity-40 cursor-pointer" 
                                + selectedNoteBG(note._id)
                            }  
                            key={index}>

                            <div className="flex-1 ">{note.name}</div>
                            <div className="flex-1 text-right">{note.creationDate.substring(0,10)}</div>
                        </div>
            })
        }
    };

	return (
        <div className= "flex h-full">
            <div className="relative flex flex-col w-1/4 bg-yellow-100 p-6">
                <div className={    " flex py-4 px-2 text-center text-gray-900 text-3xl md:text-4xl xl:text-5xl" +
                                    ` border-0 border-b-2 border-red-400`}>
                    Notes
                </div>

                <div className={    "flex justify-center"+
                                    ` p-4 border-0 border-b border-gray-400 border-opacity-50`}>
                    <button
                    onClick={newNote}
                    className={
                        "flex flex-row justify-center items-center space-x-1 rounded-md p-2  text-white w-full" +
                        ` bg-red-400` +
                        ` hover:bg-red-600`
                    }>{
                        <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                        </svg>
                    }
                    {!isLarge && <h2>New Note</h2>}
                    </button>
                </div>
                <div className="flex-row h-full overflow-x-hidden overflow-y-auto">
                    {elementsList(notes.notes)}
                </div>
            </div>
            {notes.currentNote && <NoteContent />}
        </div>
    );
};

export default NotesPage
