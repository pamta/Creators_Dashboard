const express = require("express");
const router = express.Router();
const axios = require("axios");
const oauth1a = require("axios-oauth-1.0a");
const helper = require("../../../../utils/Oauth1Helper");

router.post("/request_token", async (req, res) => {
  const client = axios.create();
  let twConsumerKey = req.body.twConsumerKey;
  let twConsumerSecret = req.body.twConsumerSecret;

  oauth1a.default(client, {
    key: twConsumerKey,
    secret: twConsumerSecret,
    algorithm: "HMAC-SHA1",
  });

  client
    .request({
      url: "https://api.twitter.com/oauth/request_token",
      method: "post",
      headers: { oauth_callback: "oob" },
    })
    .then(function (reS) {
      let keys = reS.data;
      res.send(keys);
    })
    .catch(function (e) {
      res.send(e);
    });
});

router.post("/access_token", async (req, res) => {
  const client = axios.create();
  let twConsumerKey = req.body.twConsumerKey;
  let twConsumerSecret = req.body.twConsumerSecret;
  let requestToken = req.body.requestToken;
  let verifierToken = req.body.verifierToken;
  let requestTokenSecret = req.body.requestTokenSecret;

  const request = {
    url: "https://api.twitter.com/oauth/access_token",
    method: "POST",
    param: {
      oauth_token: requestToken,
      oauth_verifier: verifierToken,
    },
  };

  const authHeader = helper.getAuthHeaderForRequest(
    request,
    twConsumerKey,
    twConsumerSecret,
    requestToken,
    requestTokenSecret
  );
  client
    .request({
      url: request.url,
      method: "post",
      headers: authHeader,
      params: {
        oauth_token: requestToken,
        oauth_verifier: verifierToken,
      },
    })
    .then(function (reS) {
      let keys = reS.data;
      res.send(keys);
    })
    .catch(function (e) {
      console.log(e);
      res.send(e);
    });
});

router.post("/tweet", async (req, res) => {
  const client = axios.create();
  let twConsumerKey = req.body.twConsumerKey;
  let twConsumerSecret = req.body.twConsumerSecret;
  let twToken = req.body.twToken;
  let twTokenSecret = req.body.twTokenSecret;
  let tweet = req.body.tweet;

  const request = {
    url: "https://api.twitter.com/1.1/statuses/update.json",
    method: "POST",
  };

  const authHeader = helper.getAuthHeaderForRequest(
    request,
    twConsumerKey,
    twConsumerSecret,
    twToken,
    twTokenSecret
  );
  client
    .request({
      url: request.url,
      method: "post",
      headers: authHeader,
      params: {
        status: tweet,
      },
    })
    .then(function (reS) {
      console.log(reS);
      let tweet = reS.data;
      res.send(tweet);
    })
    .catch(function (e) {
      console.log(e);
      res.send(e);
    });
});

module.exports = router;
