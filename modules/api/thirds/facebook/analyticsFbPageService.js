const axios = require('axios')
const AnalyticsFbPage = require('./analyticsFbPageDAO')
const config = require('config')
const fbAppId = config.get('fbAppId')

function metricsInList() {
	const subAttributeRegex = new RegExp('page.')
	const subAttributes = Object.keys(AnalyticsFbPage.schema.paths).filter(
		(attribute) => subAttributeRegex.test(attribute)
	)
	return subAttributes
}

class AnalyticsFbPageService {
	async updatePageAnalytic(fbPageID, pageAccessToken) {
		const metrics = metricsInList().join(', ')
		const requestLink = `https://graph.facebook.com/${fbPageID}/insights/${metrics}?access_token=${pageAccessToken}`
		const answer = await axios.get(requestLink)

		let analyticDTO = {}
		answer.data.data.forEach((attributeData) => {
			let value = attributeData.values[0].value
			if (typeof value == 'object') {
				value = ''
			}
			analyticDTO[attributeData.name] = value
		})
		const analytic = new AnalyticsFbPage(analyticDTO)
		await analytic.upload()
		return analytic
	}
}

module.exports = AnalyticsFbPageService
