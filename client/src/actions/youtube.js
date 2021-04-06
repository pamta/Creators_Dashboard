import axios from 'axios'
import {
	YT_AUTH_USER_SUCCESS,
	YT_AUTH_USER_FAIL,
	YT_LOAD_STORED_DATA_SUCCESS,
} from './types'
import { YOUTUBE_TOKEN } from '../utils/localStorageTypes'

export const setYTUserInfo = () => async (dispatch, getState) => {
	console.log(axios.defaults.headers.common)
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.post('/youtube/auth', config)

		const credentials = res.data

		const payload = {
			accessToken: credentials.access_token,
			refreshToken: credentials.refresh_token,
			expiryDate: credentials.expiry_date,
		}
		dispatch({
			type: YT_AUTH_USER_SUCCESS,
			payload,
		})

		localStorage.setItem(YOUTUBE_TOKEN, JSON.stringify(getState().youtube))
	} catch (error) {
		console.log(error)
		dispatch({ type: YT_AUTH_USER_FAIL })
	}
}

export const loadYTDataFromStorage = () => (dispatch) => {
	const ytData = localStorage.getItem(YOUTUBE_TOKEN)
	if (ytData) {
		localStorage.setItem(YOUTUBE_TOKEN, JSON.stringify(JSON.parse(ytData)))

		dispatch({
			type: YT_LOAD_STORED_DATA_SUCCESS,
			payload: JSON.parse(ytData),
		})
	}
}
