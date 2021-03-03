//This file contains all the redux actions related with user aunthentication
//Those being: loadUser(), login(), logout(), register()
import axios from "axios";
import { setAlert } from "./alert";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import {
  setAuthToken,
  setFacebookToken,
  setInstagramToken,
  setTwitterToken,
} from "../utils/tokenSetter";
import {
  AUTH_TOKEN,
  FACEBOOK_TOKEN,
  INSTAGRAM_TOKEN,
  TWITTER_TOKEN,
} from "../utils/localStorageTypes";

// Load User
export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage[AUTH_TOKEN]);
  setFacebookToken(localStorage[FACEBOOK_TOKEN]);
  setInstagramToken(localStorage[INSTAGRAM_TOKEN]);
  setTwitterToken(localStorage[TWITTER_TOKEN]);

  try {
    // Get the user info from the token
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      // User info
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (userIdentifier, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ userIdentifier, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // Get the info of the user in the state
    dispatch(loadUser());
  } catch (error) {
    // Our backend send an array of errors when there is one or more. Show them all as alerts
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Register User
export const register = ({ name, userName, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, userName, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // Get the info of the user in the state
    dispatch(loadUser());
  } catch (error) {
    // Our backend send an array of errors when there is one or more. Show them all as alerts
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};