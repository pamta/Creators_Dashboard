const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  video: {
    URL: String,
    name: String,
    isLoading: Boolean,
  },
  images: [
    {
      URL: String,
      name: String,
      isLoading: Boolean,
    },
  ],
  text: {
    type: String,
  },
  publicationsToSocialNetworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "publicationInSN",
    },
  ],
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "note",
    },
  ],
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Publication = mongoose.model("publication", PublicationSchema);
