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
    video: {
        URL: String,
        name: String
    },
    images: [{
        URL: String,
        name: String
    }],
    text: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("publication", PublicationSchema);