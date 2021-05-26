const axios = require('axios')
const AnalyticsFbPost = require('./analyticsFbPostDAO')
const config = require('config')
const fbAppId = config.get('fbAppId')

function metricsInList() {
	const subAttributeRegex = new RegExp('post.')
	let subAttributes = Object.keys(AnalyticsFbPost.schema.paths).filter(
		(attribute) => subAttributeRegex.test(attribute)
	)
	subAttributes = subAttributes.filter(
		(attribute) => attribute != 'post_comments'
	)
	return subAttributes
}

class AnalyticsFbPostService {
	async create(fbPostID, pageAccessToken) {
		const metrics = metricsInList().join(', ')
		const requestLink = `https://graph.facebook.com/${fbPostID}/insights/${metrics}?access_token=${pageAccessToken}`
		const commentsLink = `https://graph.facebook.com/${fbPostID}/comments?access_token=${pageAccessToken}`
		const answer = await axios.get(requestLink)
		const commentAnswer = await axios.get(commentsLink)

		let analyticDTO = {}
		answer.data.data.forEach((attributeData) => {
			let value = attributeData.values[0].value
			if (typeof value == 'object') {
				value = ''
			}
			analyticDTO[attributeData.name] = value
		})
		analyticDTO['post_comments'] = commentAnswer.data.data.length
		// console.log(commentAnswer.data.data.length)
		const analytic = new AnalyticsFbPost(analyticDTO)
		await analytic.upload()
		return analytic
	}
}

module.exports = AnalyticsFbPostService
