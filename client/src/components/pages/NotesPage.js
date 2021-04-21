
//React
import { useState } from "react";
import React,  { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import useWindowSize from '../../lib/useWindowSize';
import NoteContent from '../Notes/NoteContent';
import AddSVG from '../layout/AddSVG';

//redux
import {useSelector, useDispatch} from "react-redux";
//import {createNote, setCurrentNote} from "../../actions/note"

const NotesPage = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    //fetch the storee notes
    const notes = useSelector(state => state.note);
    let { id } = useParams(); //get the params from the url

    const isMobile = useWindowSize().width <= 768
    const isLarge = useWindowSize().width <= 1280

    const newNote = (e) => {
        history.push("/notes/new");
	};

    const selectNote = (e) => {
        history.push(`/notes/${e}`);
	};

    const selectedNoteBG = (note_id) => {
        if(note_id == id){
            return " bg-yellow-300 bg-opacity-40"
        } else{
            return ""
        }
	};

    // useEffect(() => {
    //     console.log("selectedt: " + id);
	// }, [notes]); //we need to update the component state when user is updated from the store

    const elementsList = (list) => {
        if(list){
            return list.map((note, index) => {
                return  <div onClick={(e) => selectNote(note._id) } className={
                                "flex flex-row p-2 border-0 border-b border-gray-400 border-opacity-50 hover:bg-yellow-300 hover:bg-opacity-40 cursor-pointer" 
                                + selectedNoteBG(note._id)
                            }  
                            key={note._id}>

                            <div className="flex-1 flex-shrink ">{note.name}</div>
                            <div className="flex-none text-yellow-900 text-opacity-90 text-right text-sm ">{note.creationDate.substring(0,10)}</div>
                        </div>
            })
        }
    };

	return (
        <div className= "flex h-full">
            <div className="relative flex flex-col w-1/4 bg-yellow-100 p-6">
                <div className={    " flex py-4 px-2 text-center text-gray-900 text-2xl md:text-3xl font-semibold xl:" +
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
                    }>
                    <AddSVG></AddSVG>
                    {!isLarge && <h2>New Note</h2>}
                    </button>
                </div>
                <div className="flex-row h-full overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-yellow-400 pr-2">
                    {elementsList(notes.notes)}
                </div>
            </div>
            {id && <NoteContent />}
        </div>
    );
};

export default NotesPage
