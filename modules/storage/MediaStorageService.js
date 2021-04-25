const Storage = require("./StorageDAO");
const { handleError } = require("../error/ErrorHandling");

class MediaStorageService {
    getFileBlob(name){
		return Storage.getFileBlob(name);
	}

	createFileBlob(type, name ){
		return Storage.createFileBlob(type, name);
	}

	getUrlFromBlob( blob ){
		return Storage.getUrlFromBlob(blob);
	}

	async uploadVideo(blob, type, dataBuffer, size, res, socketInstance) {

        const writeStreamFinishCallback = () => {
            console.log("File finished upload: " + getUrlFromBlob(blob));
    
            // //update db to signal that the video has finished uploading
            // publicationFound.video.isLoading = false;
            // publicationFound.save((err, video) => {
            //   if (err) {
            //     return handleError(res, 500, `DB error: ${err}`, err);
            //   }
            //   console.log("Updated IsLoading state");
            // });
            socketInstance.emit('END','end');
        }

        const writeStreamErrorCallback = (err) => {
            return handleError(res, 500, "Error during media streaming", err);
        }

        let written = 0;
        
        const writeStreamDataCallback = (chunk, readableBuffer) => {
            return () => {
                written += chunk.length;
                let progress = (written/size) * 100;

                //console.log(`${progress}% uploaded, ${written}Bytes out of ${size} Bytes.`);
                socketInstance.emit('uploadProgress', `${progress}%`);

                if(written >= size){
                    readableBuffer.stop();    //special function of the stream-buffers module
                }
            };
        }
        
		Storage.createFileAndUpload(blob, type, dataBuffer, writeStreamFinishCallback, writeStreamErrorCallback, writeStreamDataCallback)
	}
}

module.exports = MediaStorageService