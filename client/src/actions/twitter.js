import request from "request";
import {
    TW_LOGIN_FAILURE,
    TW_LOGIN_SUCCESS
} from "./types"
import { twConsumerKey, twConsumerSecret } from "../config/secrets";

export const twitterLogin = () => async (dispatch) => {

    const qs = require('querystring');
    const oauth = {
        callback: 'http://localhost:3000',
        consumer_key: twConsumerKey,
        consumer_secret: twConsumerSecret
    }
    const url = 'https://api.twitter.com/oauth/request_token';

    request.post({url: url, oauth:oauth}, function(e,r,body) {
        const req_data = qs.parse(body);
        const uri = 'https://api.twitter.com/oauth/authenticate' + '?' + qs.stringify({oauth_token:req_data.oauth_token});

        const auth_data = qs.parse(body)
        const oauth = {
            consumer_key: twConsumerKey,
            consumer_secret: twConsumerSecret,
            token: auth_data.oauth_token,
            token_secret: req_data.oauth_token_secret,
            verifier: auth_data.oauth_verifier
        }
        const url = 'https://api.twitter.com/oauth/access_token'

        request.post({url:url, oauth:oauth}, function (e, r, body) {
            const perm_data = qs.parse(body);
            if(e){
                dispatch({
                    type: TW_LOGIN_FAILURE
                })
            }else{
                dispatch({
                    type: TW_LOGIN_SUCCESS,
                    payload: {
                        token: perm_data.oauth_token,
                        tokenSecret: perm_data.oauth_token_secret
                    }
                })
            }
        })
    })
}

export const tweet = (postInfo) => (dispatch, getState) => {
    const qs = require('querystring');
    const oauth = {
        consumer_key: twConsumerKey,
        consumer_secret: twConsumerSecret,
        token: getState().twitter.token,
        token_secret: getState().twitter.tokenSecret
    }
    const url = 'https://api.twitter.com/oauth/request_token';

    request.post({url: url, oauth:oauth, body:postInfo}, function(e,r,body) {
        console.log(qs.parse(body));
    })

}