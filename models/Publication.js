const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    videoURL: {
        type: String
    },
    imagesURLs: [String],
    text: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("publication", PublicationSchema);