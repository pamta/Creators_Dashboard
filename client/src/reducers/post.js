// The reducers catch every dispatch made by any action regarding one of its types
import { 
    LOAD_POSTS,
    SET_CURRENT_POST,
    POST_CREATE,
    POST_UPLOAD_IMAGES,
    POST_UPLOAD_VIDEO,
    POST_UPDATE,
    POST_DELETE,
    POST_FAIL,
} from "../actions/types";

//an array of posts as defined by their mongoose model:
// {
//     _id,
//     user_id,
//     name,
//     text,
//     creationDate,
//     updateDate,
// }
const initialState = {
    posts: [],
    currentPost: null    
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
        case LOAD_POSTS: 
            if (!payload) {return state}; //keep previous state

            return {//sets the state to all the posts loaded from the backend
                ...state, 
                posts: payload.sort(dateSort) //sort the posts by update date
            };
        case SET_CURRENT_POST:
            if (!payload) {
                return {
                    ...state, 
                    currentPost: null
                };
            };
            return {
                ...state, 
                currentPost: payload
            }; 
        case POST_CREATE:
            // Adds a new post to the initialState array
            let newState = [...state.posts, payload];
            newState.sort(dateSort); //sort the posts by update date
            return {
                ...state, 
                posts: newState
            };
        case POST_UPLOAD_IMAGES:
        case POST_UPLOAD_VIDEO:
        case POST_UPDATE:
            // get the index of the specific post, creates a copy modifing the necesary contents and replaces the previous post from the state at its previous position       
            const index = state.posts.findIndex((post) => post._id == payload._id);
            state.posts[index] = payload;

            return {
                ...state, 
                posts: state.posts
            };
        case POST_DELETE:
            return {
                ...state, 
                posts: state.posts.filter((post) => post._id !== payload._id)
            };
        case POST_FAIL:
            return state;
        default:
            return state;
    }
}
  