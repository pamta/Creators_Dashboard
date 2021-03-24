const mongoose = require("mongoose");

const AnaliticSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("analitic", AnaliticSchema);
