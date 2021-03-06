import axios from 'axios'
import { setAlert } from './alert'
import { execWithoutHeaders } from '../utils/requests'
import {
	FB_AUTH_USER_SUCCESS,
	FB_AUTH_USER_FAIL,
	FB_PAGES_RETRIVED_SUCCESS,
	FB_PAGES_RETRIVED_FAIL,
	FB_SELECT_PAGE_SUCCESS,
	FB_SELECT_PAGE_FAIL,
	FB_LOAD_STORED_DATA_SUCCESS,
	FB_MAKE_POST_SUCCESS,
	FB_MAKE_POST_FAIL,
} from './types'
import { fbAppId, fbAppSecret } from '../config/secrets'
import { FB_STRINGIFIED } from '../utils/localStorageTypes'

export const setFbUserInfo =
	(shortLivedToken) => async (dispatch, getState) => {
		console.log(axios.defaults.headers.common)
		const userLongLivedTokenConfig = {
			params: {
				grant_type: 'fb_exchange_token',
				client_id: fbAppId,
				client_secret: fbAppSecret,
				fb_exchange_token: shortLivedToken,
			},
		}

		try {
			let res = await execWithoutHeaders(() =>
				axios.get(
					'https://graph.facebook.com/v10.0/oauth/access_token',
					userLongLivedTokenConfig
				)
			)
			console.log(res)
			const longLivedToken = res.data.access_token

			const userIdConfig = {
				params: {
					access_token: longLivedToken,
				},
			}
			res = await execWithoutHeaders(() =>
				axios.get('https://graph.facebook.com/v10.0/me', userIdConfig)
			)

			const handler = res.data.name
			const id = res.data.id

			const payload = {
				shortLivedToken,
				longLivedToken,
				handler,
				id,
			}
			dispatch({
				type: FB_AUTH_USER_SUCCESS,
				payload,
			})

			localStorage.setItem(FB_STRINGIFIED, JSON.stringify(getState().facebook))

			try {
				const access_token = getState().facebook.user.longLivedToken
				const userId = getState().facebook.user.id
				console.log(getState().facebook)

				if (!access_token || !userId) {
					dispatch({
						type: FB_PAGES_RETRIVED_FAIL,
					})
					console.log('No token to get pages')
					return
				}

				const config = {
					params: {
						access_token,
					},
				}

				try {
					const res = await axios.get(
						`https://graph.facebook.com/v10.0/${userId}/accounts`,
						config
					)
					console.log('pages')
					console.log(res.data)
					const pages = []
					res.data.data.forEach((page) => {
						pages.push({
							longLivedToken: page.access_token,
							handler: page.name,
							id: page.id,
						})
					})

					dispatch({
						type: FB_PAGES_RETRIVED_SUCCESS,
						payload: pages,
					})

					localStorage.setItem(
						FB_STRINGIFIED,
						JSON.stringify(getState().facebook)
					)
				} catch (error) {
					console.log(error)
					dispatch({
						type: FB_PAGES_RETRIVED_FAIL,
					})
				}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
			dispatch({ type: FB_AUTH_USER_FAIL })
		}
	}

export const selectFbPage = (pageId) => (dispatch, getState) => {
	let elem = getState().facebook.pages.allUserPages.filter(
		(page) => page.id == pageId
	)
	if (elem['length'] == 0) {
		dispatch({ type: FB_SELECT_PAGE_FAIL })
	} else {
		dispatch({
			type: FB_SELECT_PAGE_SUCCESS,
			payload: elem[0],
		})
		localStorage.setItem(FB_STRINGIFIED, JSON.stringify(getState().facebook))
	}
}

export const loadFbDataFromStorage = () => (dispatch) => {
	const fbData = localStorage.getItem(FB_STRINGIFIED)
	if (fbData) {
		localStorage.setItem(FB_STRINGIFIED, JSON.stringify(JSON.parse(fbData)))

		dispatch({
			type: FB_LOAD_STORED_DATA_SUCCESS,
			payload: JSON.parse(fbData),
		})
	}
}

export const publishPostToFb =
	(publicationId, useVideo) => async (dispatch, getState) => {
		console.log('Here in publish post to fb')
		try {
			const page = getState().facebook.pages.selectedPageInfo
			if (page && page.longLivedToken) {
				const body = JSON.stringify({
					pageAccessToken: page.longLivedToken,
					publication_id: publicationId,
					use_video: useVideo,
				})
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				}
				const res = await axios.post('/api/facebook', body, config)
				dispatch({
					type: FB_MAKE_POST_SUCCESS,
					payload: res.data,
				})
			}
		} catch (err) {
			const errors = err.response.data.errors
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
			}
			dispatch({
				type: FB_MAKE_POST_FAIL,
			})
		}
	}
