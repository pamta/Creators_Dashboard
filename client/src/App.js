import React, { useEffect } from 'react'
import Content from './components/layout/Content'
import Navbar from './components/layout/Navbar'
import { Provider } from 'react-redux'
import store from './store'
import logo from './logo.svg'
import './App.css'
import { fbSDKInit } from './config/ApisConfig'
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

setAuthToken(localStorage[AUTH_TOKEN])
setFacebookToken(localStorage[FACEBOOK_TOKEN])
setInstagramToken(localStorage[INSTAGRAM_TOKEN])
setTwitterToken(localStorage[TWITTER_TOKEN])

const App = () => {
	// use useEffect to execute when the component loads, just once
	useEffect(() => {
		fbSDKInit()
	}, [fbSDKInit])

	return (
		<Provider store={store}>
			<div className='flex flex-row h-screen bg-gray-100'>
				<Navbar />
				<Content />
			</div>
		</Provider>
	)
}

export default App
