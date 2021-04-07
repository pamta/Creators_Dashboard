const mongoose = require("mongoose");

const PublicationInSN_Schema = new mongoose.Schema({
    socialNetwork_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "socialNetwork",
    },
    analytics_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    URL: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        default: Date.now()
    },
});

module.exports = PublicationInSN = mongoose.model("publicationInSN", PublicationInSN_Schema);