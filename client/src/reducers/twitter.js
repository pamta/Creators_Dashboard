import {
    TW_LOGIN_SUCCESS,
    TW_LOGIN_FAILURE
} from "../actions/types"

const initialState = {
    user : {
        token: null,
        tokenSecret: null,
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case TW_LOGIN_SUCCESS:
        return {
            ...state,
            user: payload
        };
    case TW_LOGIN_FAILURE:
        return {
            ...state,
            user: {
                token: null,
                tokenSecret: null
            }
        }
    default:
        return state;
    }
}
