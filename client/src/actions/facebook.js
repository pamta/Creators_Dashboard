import axios from "axios";
import { execWithoutHeaders } from "../utils/requests";
import {
  FB_AUTH_USER_SUCCESS,
  FB_AUTH_USER_FAIL,
  FB_PAGES_RETRIVED_SUCCESS,
  FB_PAGES_RETRIVED_FAIL,
  FB_SELECT_PAGE_SUCCESS,
  FB_SELECT_PAGE_FAIL,
} from "./types";
import { fbAppId, fbAppSecret } from "../config/secrets";

export const setFbUserInfo = (shortLivedToken) => async (
  dispatch,
  getState
) => {
  console.log(axios.defaults.headers.common);
  const userLongLivedTokenConfig = {
    params: {
      grant_type: "fb_exchange_token",
      client_id: fbAppId,
      client_secret: fbAppSecret,
      fb_exchange_token: shortLivedToken,
    },
  };
  console.log(userLongLivedTokenConfig);

  try {
    let res = await execWithoutHeaders(() =>
      axios.get(
        "https://graph.facebook.com/v10.0/oauth/access_token",
        userLongLivedTokenConfig
      )
    );
    console.log(res);
    const longLivedToken = res.data.access_token;

    const userIdConfig = {
      params: {
        access_token: longLivedToken,
      },
    };
    res = await execWithoutHeaders(() =>
      axios.get("https://graph.facebook.com/v10.0/me", userIdConfig)
    );

    const handler = res.data.name;
    const id = res.data.id;

    const payload = {
      shortLivedToken,
      longLivedToken,
      handler,
      id,
    };
    dispatch({
      type: FB_AUTH_USER_SUCCESS,
      payload,
    });

    try {
      const access_token = getState().facebook.user.longLivedToken;
      const userId = getState().facebook.user.id;
      console.log(getState().facebook);

      if (!access_token || !userId) {
        dispatch({
          type: FB_PAGES_RETRIVED_FAIL,
        });
        console.log("No token to get pages");
        return;
      }

      const config = {
        params: {
          access_token,
        },
      };

      try {
        const res = await axios.get(
          `https://graph.facebook.com/v10.0/${userId}/accounts`,
          config
        );
        console.log("pages");
        console.log(res.data);
        const pages = [];
        res.data.data.forEach((page) => {
          pages.push({
            longLivedToken: page.access_token,
            handler: page.name,
            id: page.id,
          });
        });

        dispatch({
          type: FB_PAGES_RETRIVED_SUCCESS,
          payload: pages,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: FB_PAGES_RETRIVED_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: FB_AUTH_USER_FAIL });
  }
};
