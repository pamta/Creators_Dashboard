import axios from "axios";
import { setAlert } from "./alert";
import { 
    LOAD_POSTS,
    SET_CURRENT_POST,
    POST_CREATE,
    POST_UPLOAD_IMAGES,
    POST_UPLOAD_VIDEO,
    POST_UPDATE_TEXT,
    POST_DELETE,
    POST_FAIL,
} from "./types";

const handlePostError = (error, dispatch) => {
  // Our backend send an array of errors when there is one or more. Show them all as alerts
  if (error.response) {
    const errors = error.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }else{ //in case the error is sent from any other point in the conection
    dispatch(setAlert(error.message, "danger"));
  }
  dispatch({
    type: POST_FAIL,
  });
}

// ######## ACTIONS ########

export const setCurrentPost = (post_id) => async (dispatch) => {
  try {
    console.log("selecting post: " + post_id);
    dispatch({
        type: SET_CURRENT_POST,
        payload: post_id
      });
  } catch (error) {
    handlePostError(error, dispatch);
  }
};

// Load all Posts from this user
export const loadPosts = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/publication/all", config);

    dispatch({
      type: LOAD_POSTS,
      payload: res.data
    });
  } catch (error) {
    handlePostError(error, dispatch);
  }
};


// Create new Post
export const createPost = (name) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Creting new post");
    try {
      const body = JSON.stringify({ name });      
      //res.data contains the new post object as created in the backend
      const res = await axios.post("/api/publication", body, config);

      dispatch(setAlert("New Post Created", "success"));
      dispatch({
        type: POST_CREATE,
        payload: res.data, //newly created post object
      });
      dispatch(setCurrentPost(res.data._id));
      console.log("Creted new post");
    } catch (error) {
      handlePostError(error, dispatch);
    }
  };


// // Update Note
// export const updateNote = (note_id, name, text) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const body = JSON.stringify({ note_id, name, text });      
//     //res.data contains the updated object as in the backend
//     const res = await axios.post("/api/note/update", body, config);

//     dispatch(setAlert("Note updated", "success"));
//     dispatch({
//       type: NOTE_UPDATE,
//       payload: res.data,
//     });

//   } catch (error) {
//     handlePostError(error, dispatch);
//   }
// };


// Delete Post
export const deletePost = (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "publication_id": post_id
    },
  };

  try {
    //res.data contains the deleted note id at res.data._id
    const res = await axios.delete("/api/publication/", config);

    dispatch(setAlert("Post Deleted", "success"));
    dispatch({
      type: POST_DELETE,
      payload: res.data,
    });
    dispatch(setCurrentPost(null));

  } catch (error) {
    handlePostError(error, dispatch);
  }
};
