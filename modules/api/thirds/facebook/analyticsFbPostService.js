const axios = require("axios");
const AnalyticsFbPost = require("./analyticsFbPostDAO");
const config = require("config");
const fbAppId = config.get("fbAppId");

function metricsInList() {
  const subAttributeRegex = new RegExp("post.");
  const subAttributes = Object.keys(
    AnalyticsFbPost.schema.paths
  ).filter((attribute) => subAttributeRegex.test(attribute));
  return subAttributes;
}

class AnalyticsFbPostService {
  async create(fbPostID, pageAccessToken, useVideo) {
    const metrics = metricsInList().join(", ");
    const compoundID = useVideo ? `${fbAppId}_${fbPostID}` : `${fbPostID}`;
    const requestLink = `https://graph.facebook.com/${compoundID}/insights/${metrics}?access_token=${pageAccessToken}`;
    const answer = await axios.get(requestLink);

    let analyticDTO = {};
    answer.data.data.forEach((attributeData) => {
      let value = attributeData.values[0].value;
      if (typeof value == "object") {
        value = "";
      }
      analyticDTO[attributeData.name] = value;
    });
    const analytic = new AnalyticsFbPost(analyticDTO);
    await analytic.upload();
    return analytic;
  }
}

module.exports = AnalyticsFbPostService;
