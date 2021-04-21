class StorageDAO {
	constructor(publicationDTO) {
		super(publicationDTO)
	}

	static createFileBlob = async (jsonParams) => {
		const blob = mediaBucket.file(`${uuid()}.${mime.extensions[type][0]}`);
		const publicURL = `https://storage.googleapis.com/${mediaBucket.name}/${blob.name}`;
		return blob;
	}
}

module.exports = StorageDAO