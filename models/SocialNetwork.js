const mongoose = require("mongoose");

const SocialNetworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hasText: {
        type: Boolean,
        required: true,
        default: false,
    },
    hasImage: {
        type: Boolean,
        required: true,
        default: false,
    },
    hasVideo: {
        type: Boolean,
        required: true,
        default: false,
    },
    textLimit: {
        type: Number
    },
    imageLimit: {
        type: Number
    },
    videoLimit: {
        type: Number
    }
});

module.exports = SocialNetwork = mongoose.model("socialNetwork", SocialNetworkSchema);