const mongoose = require("mongoose");

const PublicationInSN_Schema = new mongoose.Schema({
  socialNetwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "socialNetwork",
  },
  analytics: [
    {
      object: {
        type: mongoose.Schema.Types.ObjectId,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  reference: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = PublicationInSN = mongoose.model(
  "publicationInSN",
  PublicationInSN_Schema
);
