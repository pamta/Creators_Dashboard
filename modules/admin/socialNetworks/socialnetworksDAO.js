const SocialNetwork = require("../../../models/SocialNetwork");

class SocialNetworksDAO extends SocialNetwork {
  constructor(publicationDTO) {
    super(publicationDTO);
  }

  static find = async (jsonParams) => {
    const publication = await SocialNetwork.find(jsonParams).exec();
    return publication;
  };

  static findById = async (id) => {
    const publicationSN = await SocialNetwork.findById(id).exec();
    return publicationSN;
  };

  static findOne = async (jsonParams) => {
    const publication = await SocialNetwork.findOne(jsonParams).exec();
    return publication;
  };

  static findByIdAndUpdate = async (publicationID, publication, callback) => {
    await SocialNetwork.findByIdAndUpdate(
      publicationID,
      publication,
      callback
    ).exec();
  };

  static remove = async (jsonParams, callback) => {
    await SocialNetwork.remove(jsonParams, callback).exec();
  };

  upload = async () => {
    await this.save();
    return this;
  };
}

module.exports = SocialNetworksDAO;
