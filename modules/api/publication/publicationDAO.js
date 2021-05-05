const Publication = require("../../../models/Publication");
const SocialNetwork = require("../../../models/SocialNetwork");
const fbAnalyticPost = require("../../../models/AnalyticsFbPost");

const analyticByName = {
  Facebook: fbAnalyticPost,
};

class PublicationDAO extends Publication {
  constructor(publicationDTO) {
    super(publicationDTO);
  }

  static find = async (jsonParams) => {
    const publication = await Publication.find(jsonParams).exec();
    return publication;
  };

  static findOne = async (jsonParams) => {
    const publication = await Publication.findOne(jsonParams).exec();
    return publication;
  };

  static findByIdAndUpdate = async (publicationID, publication, callback) => {
    await Publication.findByIdAndUpdate(
      publicationID,
      publication,
      {new: true}, //so the callback allways returns the updated object
      callback
    ).exec();
  };

  static remove = async (jsonParams, callback) => {
    await Publication.remove(jsonParams, callback).exec();
  };

  static getPostAnalyticsByDate = async (jsonParams) => {
    let publication = await Publication.findOne(jsonParams)
      .populate("publicationsToSocialNetworks")
      .exec();

    const res = await Promise.all(
      publication.publicationsToSocialNetworks.map(async (pub) => {
        const socialNet = await SocialNetwork.findById(pub.socialNetwork);
        const socialNetPostAnalytics = analyticByName[socialNet.name];

        const arrAnalytics = [];
        await Promise.all(
          pub.analytics.map(async (analytic) => {
            let element = await socialNetPostAnalytics.findById(
              analytic.object
            );
            arrAnalytics.push({
              date: analytic.date,
              socialNetwork: socialNet.name,
              data: element,
            });
          })
        );
        return arrAnalytics;
      })
    );

    return res;
  };

  upload = async () => {
    await this.save();
    return this;
  };
}

module.exports = PublicationDAO;
