const mime = require("mime-types");
const { v4: uuid } = require("uuid");

class StorageDAO {

	static getFileBlob = async (name) => {
		const blob = mediaBucket.file(name);
		return blob;
	}

	static createFileBlob = async (type, name ) => {
		const blob = mediaBucket.file(`${name || uuid() }.${mime.extensions[type][0]}`);
		return blob;
	}

	static getNameFromBlob = async ( blob ) => {
		const publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;
		return publicURL;
	}

	static createFileAndUpload = async (blob, dataBuffer, writeFinishStreamCallback, writeErrorStreamCallback, writeDataStreamCallback) => {

		const writeStream = blob.createWriteStream({
			resumable: true,
			contentType: type,
			//predefinedAcl: 'publicRead', //posible error
		  });
		
		writeStream.on("error", writeErrorStreamCallback);
  
		writeStream.on("finish", writeFinishStreamCallback);
		
		//Read Stream config
		let readableBuffer = new streamBuffers.ReadableStreamBuffer({
		  frequency: 2,      // in milliseconds.
		  chunkSize: 65536          // in bytes.
		});
		readableBuffer.put(dataBuffer);
  
		let written = 0;
  
		readableBuffer.on('end', function() {
		  //console.log("Finished Readable Stream");
		  writeStream.end();
		});
  
		readableBuffer.on('data', chunk => {
			writeStream.write(chunk, writeDataStreamCallback);
		});
	}
}

module.exports = StorageDAO