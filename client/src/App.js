import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fbSDKInit } from './config/ApisConfig'
import useWindowSize from './lib/useWindowSize'
//Assets
import logo from './logo.svg'
//Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
//Style
import './App.css'
//Components
import Navbar from "./components/layout/Navbar";
import MobileNavbar from "./components/layout/MobileNavbar";
import Alert from "./components/layout/Alert";
import LandingPage from "./components/pages/LandingPage";
import PostsPage from "./components/pages/PostsPage";
import PostsPageTest from "./components/posts/PostsPageTest";
import ViewPostPage from "./components/pages/ViewPost";
import NotesPage from "./components/pages/NotesPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import SettingsPage from "./components/pages/SettingsPage";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
//
import {
	setAuthToken,
	setFacebookToken,
	setInstagramToken,
	setTwitterToken,
} from './utils/tokenSetter'
import {
	AUTH_TOKEN,
	FACEBOOK_TOKEN,
	INSTAGRAM_TOKEN,
	TWITTER_TOKEN,
} from './utils/localStorageTypes'
import { loadFbDataFromStorage } from './actions/facebook'
import EditPostPage from './components/posts/EditPostPage'

setAuthToken(localStorage[AUTH_TOKEN])
setFacebookToken(localStorage[FACEBOOK_TOKEN])
setInstagramToken(localStorage[INSTAGRAM_TOKEN])
setTwitterToken(localStorage[TWITTER_TOKEN])

const App = () => {
	// use useEffect to execute when the component loads, just once
	useEffect(() => {
		fbSDKInit()
		store.dispatch(loadFbDataFromStorage())
		store.dispatch(loadUser())
	}, [fbSDKInit, loadUser, loadFbDataFromStorage])

	// Constantly update isMobile variable
	const isMobile = useWindowSize().width <= 768

	const getLayoutStyle = () => {
		return isMobile ? 'flex flex-col ' : 'flex flex-row border shadow-xl '
	}

  return (
    <Provider store={store}>
      <Router>
        <div  className="absolute w-screen z-10">
          <Alert />
        </div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
        </Switch>
        <div className={getLayoutStyle() + " bg-gray-100 h-full"}>
          {!isMobile ? (
            <PrivateRoute path="/" component={Navbar} />
          ) : (
            <PrivateRoute path="/" component={MobileNavbar} />
          )}
          <div
            className={
              "h-full w-full bg-white rounded-tl-xl border shadow-xl p-4"
            }
          >
            <Switch>
              <PrivateRoute exact path="/" component={LandingPage} />
              <PrivateRoute path="/posts" component={PostsPage} />
              <PrivateRoute path="/editpost/:id" component={EditPostPage} />
              <PrivateRoute path="/notes" component={NotesPage} />
              <PrivateRoute path="/analytics" component={AnalyticsPage} />
              <PrivateRoute path="/settings" component={SettingsPage} />
              <PrivateRoute path="/test" component={PostsPageTest} />
              <PrivateRoute path="/view" component={ViewPostPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App
