const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// Just state that this is an async function
const connectDB = async () => {
  try {
    // connect gives you back a promise.
    // connect to the db with moongose
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('\nConnected to DB: ' + mongoose.connection.host + ":" + mongoose.connection.port);
      console.log("\tname: " + mongoose.connection.name);
      console.log('\tWith collections: ');
        for (e in mongoose.connection.collections){
            console.log('\t\t' + e);
        }
      });

    console.log("MongoDB Connected...");

  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// To be expored when using this file/module as required
module.exports = connectDB;
