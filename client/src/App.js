import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

  return (
    <Provider store={store}>
      <Router>
        {" "}
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
