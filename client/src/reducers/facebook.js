import {
  FB_AUTH_USER_SUCCESS,
  FB_AUTH_USER_FAIL,
  FB_PAGES_RETRIVED_SUCCESS,
  FB_PAGES_RETRIVED_FAIL,
} from "../actions/types";

const initialState = {
  user: {
    shortLivedToken: null,
    longLivedToken: null,
    handler: null,
    id: null,
  },

  pages: {
    allUserPages: [],
    selectedPageInfo: null,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FB_AUTH_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case FB_AUTH_USER_FAIL:
      return {
        ...state,
        user: {
          shortLivedToken: null,
          longLivedToken: null,
          handler: null,
          id: null,
        },
      };
    case FB_PAGES_RETRIVED_SUCCESS:
      return {
        ...state,
        pages: { ...state.pages, allUserPages: payload },
      };
    case FB_PAGES_RETRIVED_FAIL:
      return {
        ...state,
        pages: { ...state.pages, allUserPages: [] },
      };
    default:
      return state;
  }
}
