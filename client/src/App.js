import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import logo from "./logo.svg";
import "./App.css";
import { loadUser } from "./actions/auth";
import { fbSDKInit } from "./config/ApisConfig";
import {
  setAuthToken,
  setFacebookToken,
  setInstagramToken,
  setTwitterToken,
} from "./utils/tokenSetter";
import {
  AUTH_TOKEN,
  FACEBOOK_TOKEN,
  INSTAGRAM_TOKEN,
  TWITTER_TOKEN,
} from "./utils/localStorageTypes";
import Login from "./components/auth/Login";

setAuthToken(localStorage[AUTH_TOKEN]);
setFacebookToken(localStorage[FACEBOOK_TOKEN]);
setInstagramToken(localStorage[INSTAGRAM_TOKEN]);
setTwitterToken(localStorage[TWITTER_TOKEN]);

const App = () => {
  // use useEffect to execute when the component loads, just once
  useEffect(() => {
    fbSDKInit();
    store.dispatch(loadUser());
  }, [fbSDKInit, loadUser]);

  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Provider store={store}>
      {" "}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* This is an example of how to use Tailwind */}
          <p className={"bg-white text-black"}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>{" "}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </Provider>
  );
};

export default App;
