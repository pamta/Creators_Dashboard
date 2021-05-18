import {
	TW_LOGIN_SUCCESS,
	TW_LOGIN_FAILURE,
	TW_TOKEN_REQUESTED,
	TW_LOAD_STORED_DATA_SUCCESS,
} from '../actions/types'

const initialState = {
	user: {
		request_token: null,
		token: null,
		tokenSecret: null,
		user_id: null,
		screen_name: null,
	},
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case TW_LOAD_STORED_DATA_SUCCESS:
			return payload
		case TW_LOGIN_SUCCESS:
			return {
				...state,
				user: payload,
			}
		case TW_TOKEN_REQUESTED:
			return {
				...state,
				user: payload,
			}
		case TW_LOGIN_FAILURE:
			return {
				...state,
				user: {
					request_token: null,
					token: null,
					tokenSecret: null,
					user_id: null,
					screen_name: null,
				},
			}
		default:
			return state
	}
}