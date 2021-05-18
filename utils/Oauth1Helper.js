const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

class Oauth1Helper {
    static getAuthHeaderForRequest(request, consumerkey, consumersecret, tokenkey, tokenKeySecret) {
        const oauth = oauth1a({
            consumer: { key: consumerkey, secret: consumersecret },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto
                    .createHmac('sha1', key)
                    .update(base_string)
                    .digest('base64')
            },
        })

        const authorization = oauth.authorize(request, {
            key: tokenkey,
            secret: tokenKeySecret
        });

        return oauth.toHeader(authorization);
    }
}

module.exports = Oauth1Helper;