const Publication = require("../../../models/PublicationInSN");

class PublicationInSNDAO extends Publication {
  constructor(publicationDTO) {
    super(publicationDTO);
  }

  static find = async (jsonParams) => {
    const publication = await Publication.find(jsonParams).exec();
    return publication;
  };

  static findById = async (id, populateField = null, selectJSON = null) => {
    const publicationSN = await (populateField == null
      ? Publication.findById(id).exec()
      : Publication.findById(id).populate(populateField).exec());
    return publicationSN;
  };

  static findOne = async (jsonParams) => {
    const publication = await Publication.findOne(jsonParams).exec();
    return publication;
  };

  static findByIdAndUpdate = async (publicationID, publication, callback) => {
    await Publication.findByIdAndUpdate(
      publicationID,
      publication,
      callback
    ).exec();
  };

  static remove = async (jsonParams, callback) => {
    await Publication.remove(jsonParams, callback).exec();
  };

  upload = async () => {
    await this.save();
    return this;
  };
}

module.exports = PublicationInSNDAO;
