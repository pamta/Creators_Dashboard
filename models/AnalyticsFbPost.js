const mongoose = require("mongoose");

const AnalyticsFbPost = new mongoose.Schema({
  pageEngagement: {
    page_engaged_users: {
      type: String,
    },
    page_post_engagements: {
      type: String,
    },
    page_consumptions: {
      type: String,
    },
    page_consumptions_unique: {
      type: String,
    },
    page_consumptions_by_consumption_type: {
      type: String,
    },
    page_consumptions_by_consumption_type_unique: {
      type: String,
    },
    page_negative_feedback: {
      type: String,
    },
    page_negative_feedback_unique: {
      type: String,
    },
    page_negative_feedback_by_type: {
      type: String,
    },
    page_negative_feedback_by_type_unique: {
      type: String,
    },
    page_positive_feedback_by_type: {
      type: String,
    },
    page_positive_feedback_by_type_unique: {
      type: String,
    },
    page_fans_online: {
      type: String,
    },
    page_fans_online_per_day: {
      type: String,
    },
    page_fan_adds_by_paid_non_paid_unique: {
      type: String,
    },
  },
  pageImpressions: {
    page_impressions: {
      type: String,
    },
    page_impressions_unique: {
      type: String,
    },
    page_impressions_paid: {
      type: String,
    },
    page_impressions_paid_unique: {
      type: String,
    },
    page_impressions_organic: {
      type: String,
    },
    page_impressions_organic_unique: {
      type: String,
    },
    page_impressions_viral: {
      type: String,
    },
    page_impressions_viral_unique: {
      type: String,
    },
    page_impressions_nonviral: {
      type: String,
    },
    page_impressions_nonviral_unique: {
      type: String,
    },
    page_impressions_by_story_type: {
      type: String,
    },
    page_impressions_by_story_type_unique: {
      type: String,
    },
    page_impressions_by_city_unique: {
      type: String,
    },
    page_impressions_by_country_unique: {
      type: String,
    },
    page_impressions_by_locale_unique: {
      type: String,
    },
    page_impressions_by_age_gender_unique: {
      type: String,
    },
    page_impressions_frequency_distribution: {
      type: String,
    },
    page_impressions_viral_frequency_distribution: {
      type: String,
    },
  },
});

const AnalyticsFbPost = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("analyticsFbPost", AnalyticsFbPost);
