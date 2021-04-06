import {
	YT_AUTH_USER_SUCCESS,
	YT_AUTH_USER_FAIL,
	YT_LOAD_STORED_DATA_SUCCESS,
} from '../actions/types'

const initialState = {
	user: {
		accessToken: null,
		refreshToken: null,
		expiryDate: null,
	},
}

export default function (state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case YT_AUTH_USER_SUCCESS:
			return {
				...state,
				user: payload,
			}

		case YT_AUTH_USER_FAIL:
			return {
				...state,
				user: {
					accessToken: null,
					refreshToken: null,
					expiryDate: null,
				},
			}

		case YT_LOAD_STORED_DATA_SUCCESS:
			return payload

		default:
			return state
	}
}
