const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publication"
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

module.exports = Note = mongoose.model("note", NoteSchema);