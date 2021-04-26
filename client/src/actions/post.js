import axios from "axios";
import { setAlert } from "./alert";
import { 
    LOAD_POSTS,
    SET_CURRENT_POST,
    POST_CREATE,
    POST_UPLOAD_IMAGES,
    POST_UPLOAD_VIDEO,
    POST_UPDATE,
    POST_DELETE,
    POST_FAIL,
} from "./types";

const handlePostError = (error, dispatch) => {
  // Our backend send an array of errors when there is one or more. Show them all as alerts
  if (error && error.response && error.response.data.errors) {
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
export const createPost = (name) => async (dispatch) => 
  new Promise(async function(resolve, reject) {     //this dispatch returns a promise as to be able ti use the res contents after calling it (I need the new post ID)
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
      
      resolve(res.data);

    } catch (error) {
      handlePostError(error, dispatch);
      reject(error);
    }
  });


// Upload Images
export const uploadImages = ( imagesfile, post_id, ammount ) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  };
  console.log("Uploading images");

  try {
    let formData = new FormData();
    for (var i = 0; i < ammount; i++) {
      formData.append("file", imagesfile.files[i]);
    }
    formData.append("publication_id", post_id);

    const res = await axios.post("/api/publication/upload/images", formData, config);

    let plural = imagesfile.files.length > 1 ? "s" : "";
    dispatch(setAlert(`Image${plural} uploaded`, "success"));
    dispatch({
      type: POST_UPLOAD_IMAGES,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};


// Upload Video
export const uploadVideo = ( videofile, post_id ) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  };
  console.log("Uploading video");

  try {
    let formData = new FormData();
    formData.append("file", videofile.files[0]);
    formData.append("publication_id", post_id);
    //formData.append("sessionId", sessionId);

    const res = await axios.post("/api/publication/upload/video", formData, config);

    //dispatch(setAlert("Video uploaded", "success"));
    dispatch({
      type: POST_UPLOAD_VIDEO,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};


// Update Text
export const updateText = ( text, publication_id ) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const body = JSON.stringify({ text: text, publication_id: publication_id });
    const res = await axios.post("/api/publication/upload/text", body, config);

    dispatch(setAlert("Content Updated", "success"));
    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};

// Update Title
export const updateTitle = ( name, publication_id ) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const body = JSON.stringify({ name, publication_id });
    const res = await axios.post("/api/publication/upload/name", body, config);

    dispatch(setAlert("Title Updated", "success"));
    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};

//Delete Actions

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

// Delete Text
export const removeText= (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "publication_id": post_id
    },
  };

  try {
    const res = await axios.delete("/api/publication/text", config);

    dispatch(setAlert("Text Removed", "success"));
    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};

// Delete Video
export const deleteVideo= (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "publication_id": post_id
    },
  };

  try {
    const res = await axios.delete("/api/publication/video", config);

    dispatch(setAlert("Video Removed", "success"));
    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};

// Delete Images
export const deleteImages= (post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "publication_id": post_id
    },
  };

  try {
    const res = await axios.delete("/api/publication/images", config);

    dispatch(setAlert("Images Removed", "success"));
    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};

// Delete a specific Image
export const deleteImage= (post_id, name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "publication_id": post_id,
      "image_name": name,
    },
  };

  try {
    const res = await axios.delete("/api/publication/image", config);

    dispatch(setAlert("Images Removed", "success"));
    dispatch({
      type: POST_UPDATE,
      payload: res.data,
    });

  } catch (error) {
    handlePostError(error, dispatch);
  }
};

