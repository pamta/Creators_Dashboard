const Storage = require('./StorageDAO')
const { handleError } = require('../error/ErrorHandling')

class MediaStorageService {
	getFileBlob(name) {
		return Storage.getFileBlob(name)
	}

	createFileBlob(type, name) {
		return Storage.createFileBlob(type, name)
	}

	getUrlFromBlob(blob) {
		return Storage.getUrlFromBlob(blob)
	}

	async uploadVideo(
		blob,
		type,
		dataBuffer,
		size,
		res,
		socketInstance,
		uploadFinishedCallback
	) {
		const writeStreamFinishCallback = () => {
			console.log('Video finished upload: ' + this.getUrlFromBlob(blob))

			uploadFinishedCallback?.()

			//socketInstance.emit('end','video');
		}

		const writeStreamErrorCallback = (err) => {
			socketInstance.emit('uploaderror', 'video')
			socketInstance.emit('reload', 'video')
			return handleError(res, 500, 'Error during media streaming', err)
		}

		let written = 0

		const writeStreamDataCallback = (chunk, readableBuffer) => {
			return () => {
				written += chunk.length
				let progress = (written / size) * 100

				//console.log(`${progress}% uploaded, ${written}Bytes out of ${size} Bytes.`);
				socketInstance.emit('uploadProgress', `${Math.floor(progress)}`)

				if (written >= size) {
					readableBuffer.stop() //special function of the stream-buffers module
				}
			}
		}

		Storage.createFileAndUpload(
			blob,
			type,
			dataBuffer,
			writeStreamFinishCallback,
			writeStreamErrorCallback,
			writeStreamDataCallback
		)
	}

	async uploadImage(
		blob,
		type,
		dataBuffer,
		size,
		res,
		socketInstance,
		uploadFinishedCallback
	) {
		const writeStreamFinishCallback = () => {
			console.log('Image finished upload: ' + this.getUrlFromBlob(blob))

			uploadFinishedCallback?.()

			//socketInstance.emit('reload','image');
			//socketInstance.emit('end','image');
		}

		const writeStreamErrorCallback = (err) => {
			socketInstance.emit('uploaderror', 'image')
			socketInstance.emit('reload', 'image')
			return handleError(res, 500, 'Error during media streaming', err)
		}

		let written = 0

		const writeStreamDataCallback = (chunk, readableBuffer) => {
			return () => {
				written += chunk.length
				let progress = (written / size) * 100

				//console.log(`${progress}% uploaded, ${written}Bytes out of ${size} Bytes.`);

				//socketInstance.emit('uploadProgress', `${progress}%`);

				if (written >= size) {
					readableBuffer.stop() //special function of the stream-buffers module
				}
			}
		}

		Storage.createFileAndUpload(
			blob,
			type,
			dataBuffer,
			writeStreamFinishCallback,
			writeStreamErrorCallback,
			writeStreamDataCallback
		)
	}
}

module.exports = MediaStorageService
