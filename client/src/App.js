import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import logo from "./logo.svg";
import Navbar from "./components/layout/Navbar";
import MobileNavbar from "./components/layout/MobileNavbar";
import Alert from "./components/layout/Alert";
import LandingPage from "./components/pages/LandingPage";
import PostsPage from "./components/pages/PostsPage";
import NotesPage from "./components/pages/NotesPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import SettingsPage from "./components/pages/SettingsPage";
import PrivateRoute from "./components/routing/PrivateRoute";
import store from "./store";
import "./App.css";
import { fbSDKInit } from "./config/ApisConfig";
import { loadUser } from "./actions/auth";
import useWindowSize from "./lib/useWindowSize";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
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

  // Constantly update isMobile variable
  const isMobile = useWindowSize().width <= 768;

  const getLayoutStyle = () => {
    return isMobile ? "flex flex-col" : "flex flex-row";
  };

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
        </Switch>
        <div className={getLayoutStyle() + " bg-gray-100 h-full"}>
          {!isMobile ? <Navbar /> : <MobileNavbar />}
          <div
            className={
              "h-full w-full bg-white rounded-tl-xl border shadow-xl p-4"
            }
          >
            <Switch>
              <PrivateRoute exact path="/" component={LandingPage} />
              <PrivateRoute path="/posts" component={PostsPage} />
              <PrivateRoute path="/notes" component={NotesPage} />
              <PrivateRoute path="/analytics" component={AnalyticsPage} />
              <PrivateRoute path="/settings" component={SettingsPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
