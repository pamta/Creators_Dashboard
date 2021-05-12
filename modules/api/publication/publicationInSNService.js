const PublicationInSN = require("./publicationInSNDAO");
const SocialNetwork = require("../../admin/socialNetworks/socialnetworksDAO");
const Facebook = require("../thirds/facebook/analyticsFbPostDAO");
const Twitter = null;
const YouTube = require("../thirds/youtube/ytAnalyticsDAO");
Facebook.collection.collectionName;

const socialDict = {
  Facebook,
  Twitter,
  YouTube,
};

class PublicationInSNService {
  static analyticsArrayLimit = 15;

  async create(socialNetworkID, reference) {
    const socialNetwork = await SocialNetwork.findById(socialNetworkID);
    if (!socialNetwork) {
      throw new Error(`No social network with ID: ${socialNetworkID}`);
    }
    const publicationSN = new PublicationInSN({
      socialNetwork: socialNetworkID,
      reference,
    });
    await publicationSN.upload();
    return publicationSN;
  }

  async getById(publicationSNID, populateField = null) {
    const publicationSN = await PublicationInSN.findById(
      publicationSNID,
      populateField
    );
    return publicationSN;
  }

  async pushAnalyticRef(publicationSNID, analyticID) {
    let publicationSN = null;
    try {
      publicationSN = await PublicationInSN.findById(
        publicationSNID,
        "socialNetwork"
      );
    } catch (error) {
      throw new Error("No publication SN with that ID");
    }

    const socialNetworkAnalytic = socialDict[publicationSN.socialNetwork.name];
    if (!socialNetworkAnalytic) {
      throw new Error(`No Social network ${socialNetworkAnalytic} registered`);
    }

    let analytic = null;
    try {
      analytic = await socialNetworkAnalytic.findById(analyticID);
    } catch (error) {
      throw new Error(`No analytic with ID: ${analyticID}`);
    }

    if (
      publicationSN.analytics.length >=
      PublicationInSNService.analyticsArrayLimit
    ) {
      publicationSN.analytics.shift();
    }
    publicationSN.analytics.push({
      object: analytic,
    });
    await publicationSN.save();
    return publicationSN;
  }
}

module.exports = PublicationInSNService;
