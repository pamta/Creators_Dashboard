import {
	TW_LOGIN_SUCCESS,
	TW_LOGIN_FAILURE,
	TW_TOKEN_REQUESTED,
	TW_LOAD_STORED_DATA_SUCCESS,
	TW_USER_ANALYTICS_SUCCESS,
} from '../actions/types'

const initialState = {
	user: {
		request_token: null,
		token: null,
		tokenSecret: null,
		user_id: null,
		screen_name: null,
	},
	analytics: {
		followers_count: null,
		friends_count: null,
		listed_count: null,
		favourites_count: null,
		statuses_count: null,
	}
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
				analytics: {
					followers_count: null,
					friends_count: null,
					listed_count: null,
					favourites_count: null,
					statuses_count: null,
				}
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
				analytics: {
					followers_count: null,
					friends_count: null,
					listed_count: null,
					favourites_count: null,
					statuses_count: null,
				}
			}
		case TW_USER_ANALYTICS_SUCCESS:
			return {
				...state,
				analytics: payload
			}
		default:
			return state
	}
}
