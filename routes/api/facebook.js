const express = require("express");
const config = require("config");
const router = express.Router();
const axios = require("axios");
const auth = require("../../middleware/auth");
const fbAppId = config.get("fbAppId");

// Exporting two objects
const { check, validationResult } = require("express-validator");

const Publication = require("../../models/Publication");

// @route  POST api/facebook
// @access Private/requires token
// Put an existing post in our DB to facebook with a fb page access token
router.post(
  "/",
  [
    auth,
    [
      check("publication_id", "A publication id is needed").not().isEmpty(),
      check("pageAccessToken", "A fb page access token is needed")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const uploadImage = async (imageURL, pageAccessToken) => {
      try {
        const answer = await axios.post(
          `https://graph.facebook.com/${fbAppId}/photos?url=${imageURL}&access_token=${pageAccessToken}&published=false`
        );
        const id = answer.data.id;
        return id;
      } catch (err) {
        console.log("Error uploading facebook image");
        console.error(err);
        return null;
      }
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { publication_id, pageAccessToken, use_video } = req.body;
      const publication = await Publication.findOne({
        _id: publication_id,
        user_id: req.user.id,
      }).exec();

      if (use_video) {
        if (!publication.video || !publication.video.URL) {
          return res.status(400).json({ errors: ["No video found"] });
        }
        const requestLink = `https://graph-video.facebook.com/v10.0/${fbAppId}/videos?access_token=${pageAccessToken}&file_url=${publication.video.URL}`;
        const answer = await axios.post(requestLink);
        return res.send(answer.data);
      }

      const { images, text } = publication;
      const thereAreImages = images && images.length > 0;
      if (!thereAreImages && !text) {
        return res.status(400).json({ errors: ["No images nor text"] });
      } else {
        const message = text ? text : "";
        let requestLink = `https://graph.facebook.com/${fbAppId}/feed?message=${message}&access_token=${pageAccessToken}`;
        if (thereAreImages) {
          // Use Promise.all to await for every element in the map
          const attached_media = await Promise.all(
            images.map(async (image) => {
              const imageId = await uploadImage(image.URL, pageAccessToken);
              return { media_fbid: imageId };
            })
          );

          requestLink += `&attached_media=${JSON.stringify(attached_media)}`;
        }

        const answer = await axios.post(requestLink);
        res.send(answer.data);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
