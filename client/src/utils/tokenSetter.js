// Function that puts the auth token if it exists, a global header
import axios from "axios";
import {
  AUTH_TOKEN,
  FACEBOOK_TOKEN,
  INSTAGRAM_TOKEN,
  TWITTER_TOKEN,
} from "./localStorageTypes";
function getSetterFunction(tokenName) {
  // Returns a function that puts tokenValue in a default header for a given tokenName
  return (tokenValue) => {
    if (tokenValue) {
      // Add it to the global header
      axios.defaults.headers.common[tokenName] = tokenValue;
    } else {
      // Delete it from the global header
      delete axios.defaults.headers.common[tokenName];
    }
  };
}

export const setAuthToken = getSetterFunction(AUTH_TOKEN);
export const setFacebookToken = getSetterFunction(FACEBOOK_TOKEN);
export const setInstagramToken = getSetterFunction(INSTAGRAM_TOKEN);
export const setTwitterToken = getSetterFunction(TWITTER_TOKEN);
