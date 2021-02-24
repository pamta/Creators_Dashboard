// The reducers catch every dispatch made by any action regarding one of its types
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
// Reducer regarding alerts
/**
 * This will be an array with the following shape
 * {
    id: 1,
    msg: 'Please log in',
    alertType: 'success'
}   
 */
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // state cannot be directly modified like that, so use the spread operator
      // Adds a new element to the initialState array
      return [...state, payload];
    case REMOVE_ALERT:
      // In this case the payload will be just an id
      // Returns all alerts but the one matching the payload
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
