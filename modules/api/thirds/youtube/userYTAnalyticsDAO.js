const Analytic = require('../../../../models/UserAnalyticsYoutube')

class UserYouTubeAnalytics extends Analytic {
	constructor(analyticDTO) {
		super(analyticDTO)
	}

	static find = async (jsonParams) => {
		const analytic = await Analytic.find(jsonParams).exec()
		return analytic
	}

	static findById = async (id) => {
		const analytic = await Analytic.findById(id).exec()
		return analytic
	}

	static findOne = async (jsonParams) => {
		const analytic = await Analytic.findOne(jsonParams).exec()
		return analytic
	}

	static findByIdAndUpdate = async (analyticID, analytic, callback) => {
		await Analytic.findByIdAndUpdate(analyticID, analytic, callback).exec()
	}

	static remove = async (jsonParams, callback) => {
		await Analytic.remove(jsonParams, callback).exec()
	}

	upload = async () => {
		await this.save()
		return this
	}
}

module.exports = UserYouTubeAnalytics
