const express = require("express");
const config = require("config");
const router = express.Router();
const axios = require("axios");
const auth = require("../../../../middleware/auth");
const fbAppId = config.get("fbAppId");

// Exporting two objects
const { check, validationResult } = require("express-validator");

const FbPostAnalytics = require("./analyticsFbPostService");
const FbPageAnalytics = require("./analyticsFbPageService");
const PublicationSN = require("../../publication/publicationInSNService");
const Publication = require("../../publication/publicationDAO");
const publicationSnService = new PublicationSN();
const fbPostAnalyticsService = new FbPostAnalytics();
const fbPageAnalyticsService = new FbPageAnalytics();

const SocialNetwork = require("../../../../models/SocialNetwork");

let facebook = null;
const getFacebook = async () => {
  if (!facebook) {
    facebook = await SocialNetwork.findOne({ name: "Facebook" });
  }
  return facebook;
};

const updatePublicationWithAnalytics = async (
  publication,
  postID,
  pageAccessToken,
  useVideo
) => {
  const fb = await getFacebook();
  const publicationInSn = await publicationSnService.create(fb.id, postID);

  if (!useVideo) {
    const fbAnalytic = await fbPostAnalyticsService.create(
      postID,
      pageAccessToken,
      false
    );

    await publicationSnService.pushAnalyticRef(
      publicationInSn.id,
      fbAnalytic.id
    );
  }
  publication.publicationsToSocialNetworks.push(publicationInSn.id);
  await publication.save();
};

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
      });

      if (use_video) {
        if (!publication.video || !publication.video.URL) {
          return res.status(400).json({ errors: ["No video found"] });
        }
        const requestLink = `https://graph-video.facebook.com/v10.0/${fbAppId}/videos?access_token=${pageAccessToken}&file_url=${publication.video.URL}`;
        const answer = await axios.post(requestLink);

        const postID = answer.data.id;
        await updatePublicationWithAnalytics(
          publication,
          postID,
          pageAccessToken,
          use_video
        );
        return res.send(publication);
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
        const postID = answer.data.id;
        await updatePublicationWithAnalytics(
          publication,
          postID,
          pageAccessToken,
          use_video
        );
        res.send(publication);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/facebook/pageAnalytics
// @access Private/requires token
// Put an existing post in our DB to facebook with a fb page access token
router.get();

module.exports = router;
