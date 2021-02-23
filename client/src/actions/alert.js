/*
"dispatch() is the method used to dispatch actions and trigger state changes to the store. 
react-redux is simply trying to give you convenient access to it."
*/
import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// We can do the dispatch because of the func middleware
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  // Randomly generate the id
  const id = uuid();
  // Thanks to dispatch we can just set the type, and this type will look for its match in the index of reducers
  // In this case SET_ALERT case is inside a switch statement that will add the generated object to a list
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // The REMOVE_ALERT case deletes the id
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
