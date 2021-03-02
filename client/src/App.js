import React, { useEffect } from 'react'
import Content from './components/layout/Content'
import Navbar from './components/layout/Navbar'
import MobileNavbar from './components/layout/MobileNavbar'
import { Provider } from 'react-redux'
import store from './store'
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
import useWindowSize from './lib/useWindowSize'

setAuthToken(localStorage[AUTH_TOKEN])
setFacebookToken(localStorage[FACEBOOK_TOKEN])
setInstagramToken(localStorage[INSTAGRAM_TOKEN])
setTwitterToken(localStorage[TWITTER_TOKEN])

const App = () => {
	// use useEffect to execute when the component loads, just once
	useEffect(() => {
		fbSDKInit()
	}, [fbSDKInit])

	// Constantly update isMobile variable
	const isMobile = useWindowSize().width <= 768

	const getLayoutStyle = () => {
		return isMobile ? 'flex flex-col' : 'flex flex-row'
	}

	return (
		<Provider store={store}>
			<div className={getLayoutStyle() + ' bg-gray-100 h-full'}>
				{!isMobile ? <Navbar /> : <MobileNavbar />}
				<div
					className={
						'h-full w-full bg-white rounded-tl-xl border shadow-xl p-4'
					}
				>
					content
				</div>
			</div>
		</Provider>
	)
}

export default App
