const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
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

module.exports = Note = mongoose.model("note", NoteSchema);