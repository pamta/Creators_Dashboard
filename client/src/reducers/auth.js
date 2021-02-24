const initialState = {
  // Auth from our app
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  // Auth from social networks
  socialAuth: {
    // TODO: Set values in localstorage for the tokens
    facebook: {
      token: null,
      isAuthenticated: null,
    },
    instagram: {
      token: null,
      isAuthenticated: null,
    },
    twitter: {
      token: null,
      isAuthenticated: null,
    },
  },
};

// TODO
export default function (state = initialState, action) {
  const { type, payload } = action;
  return state;
}
