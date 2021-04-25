const mime = require("mime-types");
const { v4: uuid } = require("uuid");
const streamBuffers = require('stream-buffers');

class StorageDAO {

	static getFileBlob = (name) => {
		const blob = mediaBucket.file(name);
		return blob;
	}

	static createFileBlob = (type, name ) => {
		const blob = mediaBucket.file(`${name || uuid() }.${mime.extensions[type][0]}`);
		return blob;
	}

	static getUrlFromBlob = ( blob ) => {
		const publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;
		return publicURL;
	}

	static createFileAndUpload = async (blob, type, dataBuffer, writeStreamFinishCallback, writeStreamErrorCallback, writeStreamDataCallback) => {

		const writeStream = blob.createWriteStream({
			resumable: true,
			contentType: type,
			//predefinedAcl: 'publicRead', //posible error
		  });
		
		writeStream.on("error", writeStreamErrorCallback);
  
		writeStream.on("finish", writeStreamFinishCallback);
		
		//Read Stream config
		let readableBuffer = new streamBuffers.ReadableStreamBuffer({
		  frequency: 2,      // in milliseconds.
		  chunkSize: 65536          // in bytes.
		});
		readableBuffer.put(dataBuffer);
  
		readableBuffer.on('end', function() {
		  //console.log("Finished Readable Stream");
		  writeStream.end();
		});
  
		readableBuffer.on('data', chunk => {
			writeStream.write(chunk, writeStreamDataCallback(chunk, readableBuffer));
		});
	}
}

module.exports = StorageDAO