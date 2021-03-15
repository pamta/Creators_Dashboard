const { Storage } = require("@google-cloud/storage"); 
const path = require("path");
const config = require("config");
const google = config.get("google");

const connectGoogleCloud = async () => {
    gc = new Storage({
        keyFilename: path.join(__dirname, "./creatorsdashboard-c8454d3b6f90.json"),
        projectId: google.projectId 
    });
      
    await gc.getBuckets().then(x => {
        console.log("Succesful connection with Google Cloud Storage Bucket");
    });

    mediaBucket = await gc.bucket(google.bucket);
    
    return mediaBucket
};

module.exports = connectGoogleCloud;