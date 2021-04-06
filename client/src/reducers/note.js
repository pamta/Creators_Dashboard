// The reducers catch every dispatch made by any action regarding one of its types
import { 
    LOAD_NOTES, 
    SET_CURRENT_NOTE,
    NOTE_CREATE,
    NOTE_UPDATE,
    NOTE_DELETE,
    NOTE_FAIL,
} from "../actions/types";

//an array of notes as defined by their mongoose model:
// {
//     _id,
//     user_id,
//     name,
//     text,
//     creationDate,
//     updateDate,
// }
const initialState = {
    notes: [],
    currentNote: "new"     
};

const  dateSort = (a, b) => {
    if(a.creationDate == b.creationDate){
        return 0;
    }else if(a.creationDate < b.creationDate){
        return 1;
    }else{
        return -1;
    }
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) { 
        case LOAD_NOTES: 
            if (!payload) {return state}; //keep previous state

            return {//sets the state to all the notes loaded from the backend
                ...state, 
                notes: payload.sort(dateSort) //sort the notes by update date
            };
        case SET_CURRENT_NOTE:
            if (!payload) {
                return {
                    ...state, 
                    currentNote: "new"
                };
            };
            return {
                ...state, 
                currentNote: payload
            }; 
        case NOTE_CREATE:
            // Adds a new note to the initialState array
            let newState = [...state.notes, payload];
            newState.sort(dateSort); //sort the notes by update date
            return {
                ...state, 
                notes: newState
            };
        case NOTE_DELETE:
            return {
                ...state, 
                notes: state.notes.filter((note) => note._id !== payload._id)
            };
        case NOTE_UPDATE:
            // get the index of the specific note, creates a copy modifing the necesary contents and replaces the previous note from the state at its previous position       
            const index = state.notes.findIndex((note) => note._id == payload._id);
            state.notes[index] = payload;

            return {
                ...state, 
                notes: state.notes
            };
        case NOTE_FAIL:
            return state;
        default:
            return state;
    }
}
  