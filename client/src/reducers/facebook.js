import {
  FB_AUTH_USER_SUCCESS,
  FB_AUTH_USER_FAIL,
  FB_PAGES_RETRIVED_SUCCESS,
  FB_PAGES_RETRIVED_FAIL,
  FB_SELECT_PAGE_SUCCESS,
  FB_SELECT_PAGE_FAIL,
  FB_LOAD_STORED_DATA_SUCCESS,
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

    case FB_SELECT_PAGE_SUCCESS:
      return {
        ...state,
        pages: { ...state.pages, selectedPageInfo: payload },
      };

    case FB_SELECT_PAGE_FAIL:
      return {
        ...state,
        pages: { ...state.pages, selectedPageInfo: null },
      };

    case FB_LOAD_STORED_DATA_SUCCESS:
      return payload;
    default:
      return state;
  }
}
