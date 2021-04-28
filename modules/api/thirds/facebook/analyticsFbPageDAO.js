const Analytic = require("../../../../models/AnalyticsFbPage");

class AnalyticsFbPageDAO extends Analytic {
  constructor(publicationDTO) {
    super(publicationDTO);
  }

  static find = async (jsonParams) => {
    const publication = await Analytic.find(jsonParams).exec();
    return publication;
  };

  static findById = async (id) => {
    const publicationSN = await Analytic.findById(id).exec();
    return publicationSN;
  };

  static findOne = async (jsonParams) => {
    const publication = await Analytic.findOne(jsonParams).exec();
    return publication;
  };

  static findByIdAndUpdate = async (publicationID, publication, callback) => {
    await Analytic.findByIdAndUpdate(
      publicationID,
      publication,
      callback
    ).exec();
  };

  static remove = async (jsonParams, callback) => {
    await Analytic.remove(jsonParams, callback).exec();
  };

  upload = async () => {
    await this.save();
    return this;
  };
}

module.exports = AnalyticsFbPageDAO;
