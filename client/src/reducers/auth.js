import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	USER_UPDATE_SUCCESS,
	USER_ANALYTICS_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
} from '../actions/types'
import {
	AUTH_TOKEN,
	FACEBOOK_TOKEN,
	INSTAGRAM_TOKEN,
	TWITTER_TOKEN,
	YOUTUBE_TOKEN,
} from '../utils/localStorageTypes'

function buildSocialObj(token = null, isAuthenticated = false) {
	return {
		token,
		isAuthenticated,
	}
}

const initialState = {
	// Auth from our app
	token: localStorage.getItem(AUTH_TOKEN),
	isAuthenticated: null,
	loading: true,
	user: {},
	// Auth from social networks
	socialAuth: {
		facebook: buildSocialObj(localStorage.getItem(FACEBOOK_TOKEN), null),
		instagram: buildSocialObj(localStorage.getItem(INSTAGRAM_TOKEN), null),
		twitter: buildSocialObj(localStorage.getItem(TWITTER_TOKEN), null),
	},
}

export default function (state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case USER_LOADED:
		case USER_ANALYTICS_UPDATE_SUCCESS:
			return {
				...state,
				// If it was loaded it was authenticated
				isAuthenticated: true,
				loading: false,
				// The payload in this case is the info of the user
				user: payload,
			}
		//For the moment there is no difference in state for a register or login
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem(AUTH_TOKEN, payload.token)
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
			}

		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem(YOUTUBE_TOKEN)
			localStorage.removeItem(FACEBOOK_TOKEN)
		case AUTH_ERROR:
			localStorage.removeItem(AUTH_TOKEN)
			localStorage.removeItem(FACEBOOK_TOKEN)
			localStorage.removeItem(INSTAGRAM_TOKEN)
			localStorage.removeItem(TWITTER_TOKEN)
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				socialAuth: {
					facebook: buildSocialObj(),
					instagram: buildSocialObj(),
					twitter: buildSocialObj(),
				},
			}
		default:
			return state
	}
}
