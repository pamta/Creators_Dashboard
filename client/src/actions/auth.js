//This file contains all the redux actions related with user aunthentication
//Those being: loadUser(), login(), logout(), register()
import axios from 'axios'
import { setAlert } from './alert'
import { loadNotes } from './note'
import { loadPosts } from './post'
import { twConsumerKey, twConsumerSecret } from '../config/secrets'

import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_ANALYTICS_UPDATE_SUCCESS,
	USER_ANALYTICS_UPDATE_FAIL,
} from './types'
import {
	setAuthToken,
	setFacebookToken,
	setInstagramToken,
	setTwitterToken,
} from '../utils/tokenSetter'
import {
	AUTH_TOKEN,
	FACEBOOK_TOKEN,
	INSTAGRAM_TOKEN,
	TWITTER_TOKEN,
} from '../utils/localStorageTypes'

// Load User
export const loadUser = () => async (dispatch) => {
	setAuthToken(localStorage[AUTH_TOKEN])
	setFacebookToken(localStorage[FACEBOOK_TOKEN])
	setInstagramToken(localStorage[INSTAGRAM_TOKEN])
	setTwitterToken(localStorage[TWITTER_TOKEN])

	try {
		// Get the user info from the token
		const res = await axios.get('/api/auth')

		dispatch({
			type: USER_LOADED,
			// User info
			payload: res.data,
		})
		//load other user related data
		dispatch(loadNotes())
		dispatch(loadPosts())
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		})
	}
}

export const updateUserAnalytics = () => async (dispatch, getState) => {
	try {
		const fbPageAccessToken =
			getState().facebook?.pages?.selectedPageInfo?.longLivedToken ?? ''
		const fbPageId = getState().facebook?.pages?.selectedPageInfo?.id ?? ''

		const twUserId = getState().twitter?.user?.user_id

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const body = JSON.stringify({
			fbPageAccessToken,
			fbPageId,
			twConsumerKey,
			twConsumerSecret,
			userId: twUserId,
		})
		console.log(body)
		const res = await axios.patch('/api/user/updateAnalytics', body, config)
		console.log('fbLog')
		console.log(res)
		dispatch({
			type: USER_ANALYTICS_UPDATE_SUCCESS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: USER_ANALYTICS_UPDATE_FAIL,
		})
	}
}

// Login User
export const login = (userIdentifier, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const body = JSON.stringify({ userIdentifier, password })

	try {
		const res = await axios.post('/api/auth', body, config)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		})
		// Get the info of the user in the state
		dispatch(loadUser())
	} catch (error) {
		// Our backend send an array of errors when there is one or more. Show them all as alerts
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch(
			setAlert('User not found. Please verify your credentials', 'danger')
		)
		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT })
}

// Register User
export const register =
	(name, userName, email, password) => async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const body = JSON.stringify({ name, userName, email, password })

		try {
			const res = await axios.post('/api/user', body, config)
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			})
			// Get the info of the user in the state
			dispatch(loadUser())
		} catch (error) {
			// Our backend send an array of errors when there is one or more. Show them all as alerts
			const errors = error.response.data.errors
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
			}
			dispatch({
				type: REGISTER_FAIL,
			})
		}
	}

// Update User data
export const updateUserData = (name, userName, email) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const body = JSON.stringify({ name, userName, email })

	try {
		const res = await axios.post('/api/user/update', body, config)
		dispatch({
			type: USER_UPDATE_SUCCESS,
		})

		dispatch(setAlert('User data succesfully updated', 'success'))
		// reload updated user data to the state
		dispatch(loadUser())
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: USER_UPDATE_FAIL,
		})
	}
}

// Delete User permanently
export const deleteUser = () => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.delete('/api/user/', config)
		dispatch({
			type: USER_DELETE_SUCCESS,
		})

		dispatch(setAlert('User succesfully deleted', 'success'))
		// reload updated user data to the state
		dispatch(logout())
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: USER_DELETE_FAIL,
		})
	}
}
