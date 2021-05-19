import axios from 'axios'
import { setAlert } from './alert'
import {
	YT_AUTH_USER_SUCCESS,
	YT_AUTH_USER_FAIL,
	YT_LOAD_STORED_DATA_SUCCESS,
	YT_PUBLISH_SUCCESS,
	YT_PUBLISH_FAIL,
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
		const nameResponse = await axios.get('/youtube/auth/channelName', config)

		const credentials = res.data

		const payload = {
			accessToken: credentials.access_token,
			refreshToken: credentials.refresh_token,
			expiryDate: credentials.expiry_date,
			channelName: nameResponse.data,
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

export const publishVideoToYT =
	(fileURL, title, description, privacyStatus, publicationID) =>
	async (dispatch, getState) => {
		console.log('Going to publish video to YouTube...')
		privacyStatus = privacyStatus ? 'public' : 'private'
		try {
			const body = JSON.stringify({
				fileURL,
				title,
				description,
				privacyStatus,
				publicationID,
			})
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			const res = await axios.post('/youtube/upload', body, config)
			dispatch({
				type: YT_PUBLISH_SUCCESS,
				payload: res.data,
			})
		} catch (err) {
			const errors = err.response.data.errors
				? err.response.data.errors
				: [err.response.data]
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
			}
			dispatch({
				type: YT_PUBLISH_FAIL,
			})
		}
	}
