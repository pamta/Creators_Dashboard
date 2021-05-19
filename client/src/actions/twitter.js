import axios from "axios";
import {
  TW_LOGIN_FAILURE,
  TW_LOGIN_SUCCESS,
  TW_TOKEN_REQUESTED,
  TW_LOAD_STORED_DATA_SUCCESS,
} from "./types";
import { twConsumerKey, twConsumerSecret } from "../config/secrets";
import { TWITTER_TOKEN } from "../utils/localStorageTypes";

export const loadTWDataFromStorage = () => (dispatch) => {
  const twData = localStorage.getItem(TWITTER_TOKEN);
  if (twData) {
    localStorage.setItem(TWITTER_TOKEN, JSON.stringify(JSON.parse(twData)));

    dispatch({
      type: TW_LOAD_STORED_DATA_SUCCESS,
      payload: JSON.parse(twData),
    });
  }
};

export const twitterLogin = () => async (dispatch, getState) => {
  axios
    .post("/api/twitter/request_token", {
      twConsumerKey: twConsumerKey,
      twConsumerSecret: twConsumerSecret,
    })
    .then(function (res) {
      let data = res.data;
      let token = data.substring(12, 39);
      let secret = data.substring(59, 91);
      window.open(
        "https://api.twitter.com/oauth/authorize?oauth_token=" + token,
        "width=200,height=100"
      );
      dispatch({
        type: TW_TOKEN_REQUESTED,
        payload: {
          request_token: token,
          token: null,
          tokenSecret: secret,
          user_id: null,
          screen_name: null,
        },
      });
      localStorage.setItem(TWITTER_TOKEN, JSON.stringify(getState().twitter));
    })
    .catch(function (e) {
      console.log(e);
      dispatch({
        type: TW_LOGIN_FAILURE,
      });
    });
};

export const twitterCodeVerify =
  (code, requestToken, requestTokenSecret) => async (dispatch, getState) => {
    axios
      .post("/api/twitter/access_token", {
        twConsumerKey: twConsumerKey,
        twConsumerSecret: twConsumerSecret,
        requestToken: requestToken,
        requestTokenSecret: requestTokenSecret,
        verifierToken: code,
      })
      .then(function (res) {
        let data = res.data.split("&");
        let token = data[0].substring(12)
        let secret = data[1].substring(19);
        let user_id = data[2].substring(8);
        let screen_name = data[3].substring(12);
        dispatch({
          type: TW_LOGIN_SUCCESS,
          payload: {
            request_token: null,
            token: token,
            tokenSecret: secret,
            user_id: user_id,
            screen_name: screen_name,
          },
        });
        localStorage.setItem(TWITTER_TOKEN, JSON.stringify(getState().twitter));
      })
      .catch(function (e) {
        console.log("Fail");
        console.log(e);
        dispatch({
          type: TW_LOGIN_FAILURE,
        });
      });
  };

export const tweet = (tweet, token, tokenSecret) => async (dispatch) => {
  axios
    .post("/api/twitter/tweet", {
      twConsumerKey: twConsumerKey,
      twConsumerSecret: twConsumerSecret,
      twToken: token,
      twTokenSecret: tokenSecret,
      tweet: tweet,
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (e) {
      console.log(e);
    });
};
