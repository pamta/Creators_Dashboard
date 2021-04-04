//This is the root reducer
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import facebook from "./facebook";
import twitter from "./twitter";
// Put all the reducers here, will be easier
export default combineReducers({
  alert,
  auth,
  facebook,
  twitter,
});
