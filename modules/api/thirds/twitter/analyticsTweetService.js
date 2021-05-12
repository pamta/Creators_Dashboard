const ArrayError = require("../../../utils/ArrayError");
const TweetAnalytic = require("./TweetAnalyticDAO");

class TweetAnalyticService {
  async getAllTweetAnalyticsForUser(userID) {
    const tweetAnalytics = await TweetAnalytic.find({ user_id: userID });
    if (!tweetAnalytics) {
      throw new ArrayError([{ msg: "No tweetAnalytics found for this user" }]);
    }
    return tweetAnalytics;
  }

  async getTweetAnalyticOfUser(tweetAnalyticID, userID) {
    const tweetAnalytic = await TweetAnalytic.findOne({
      _id: tweetAnalyticID,
      user_id: userID,
    });

    if (tweetAnalytic == null) {
      throw new ArrayError([{ msg: "No tweetAnalytics found for this user" }]);
    }

    return tweetAnalytic;
  }

  async updateTweetAnalyticName(userID, tweetAnalyticID, name, callback) {
    const tweetAnalytic = await this.getTweetAnalyticOfUser(tweetAnalyticID, userID);
    if (!tweetAnalytic) {
      throw new ArrayError([{ msg: "TweetAnalytic does not exist" }]);
    }

    // Update tweetAnalytic
    tweetAnalytic.name = name;
    tweetAnalytic.updateDate = Date.now();

    await TweetAnalytic.findByIdAndUpdate(tweetAnalyticID, tweetAnalytic, callback);
  }

  async updateTweetAnalyticText(userID, tweetAnalyticID, text, callback) {
    const tweetAnalytic = await this.getTweetAnalyticOfUser(tweetAnalyticID, userID);
    if (!tweetAnalytic) {
      throw new ArrayError([{ msg: "TweetAnalytic does not exist" }]);
    }

    // Update tweetAnalytic
    tweetAnalytic.text = text;
    tweetAnalytic.updateDate = Date.now();

    await TweetAnalytic.findByIdAndUpdate(tweetAnalyticID, tweetAnalytic, callback);
  }

  async updateTweetAnalytic(tweetAnalyticID, tweetAnalytic, callback) {
    await TweetAnalytic.findByIdAndUpdate(tweetAnalyticID, tweetAnalytic, callback);
  }
}

module.exports = TweetAnalyticService;
