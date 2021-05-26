const Publication = require('../../../models/Publication')
const SocialNetwork = require('../../../models/SocialNetwork')
const fbAnalyticPost = require('../../../models/AnalyticsFbPost')
const youtubeAnalticVideo = require('../../../models/AnalyticsYoutube')

const analyticByName = {
	Facebook: fbAnalyticPost,
	YouTube: youtubeAnalticVideo,
}

class PublicationDAO extends Publication {
	constructor(publicationDTO) {
		super(publicationDTO)
	}

	static find = async (jsonParams) => {
		const publication = await Publication.find(jsonParams).exec()
		return publication
	}

	static findOne = async (jsonParams) => {
		const publication = await Publication.findOne(jsonParams).exec()
		return publication
	}

	static findById = async (id, populateField = null, selectFields = null) => {
		let publication = null
		if (populateField == null) {
			if (selectFields == null) {
				publication = await Publication.findById(id).exec()
			} else {
				publication = await Publication.findById(id).select(selectFields).exec()
			}
		} else {
			if (selectFields == null) {
				publication = await Publication.findById(id)
					.populate(populateField)
					.exec()
			} else {
				publication = await Publication.findById(id)
					.select(selectFields)
					.populate(populateField)
					.exec()
			}
		}
		return publication
	}

	static findByIdAndUpdate = async (publicationID, publication, callback) => {
		await Publication.findByIdAndUpdate(
			publicationID,
			publication,
			{ new: true }, //so the callback allways returns the updated object
			callback
		).exec()
	}

	static remove = async (jsonParams, callback) => {
		await Publication.remove(jsonParams, callback).exec()
	}

	static getPostAnalyticsByDate = async (jsonParams) => {
		let publication = await Publication.findOne(jsonParams)
			.populate('publicationsToSocialNetworks')
			.exec()

		// Objects to calculate compound analytics
		const favorite_analytics = {
			fb: 0,
			yt: 0,
			tw: 0,
		}

		const like_analytics = {
			fb: 0,
			yt: 0,
			tw: 0,
		}

		const comment_analytics = {
			fb: 0,
			yt: 0,
			tw: 0,
		}

		const res = await Promise.all(
			publication.publicationsToSocialNetworks.map(async (pub) => {
				const socialNet = await SocialNetwork.findById(pub.socialNetwork)
				const socialNetPostAnalytics = analyticByName[socialNet.name]

				const arrAnalytics = []

				await Promise.all(
					pub.analytics.map(async (analytic) => {
						let element = await socialNetPostAnalytics.findById(analytic.object)

						// Update analytics for compound
						if (socialNet.name === 'Facebook') {
							favorite_analytics.fb = Number(element.post_reactions_love_total)
							like_analytics.fb = Number(element.post_reactions_like_total)
							comment_analytics.fb = Number(element.post_comments)
						} else if (socialNet.name === 'YouTube') {
							favorite_analytics.yt = Number(element.favoriteCount)
							like_analytics.yt = Number(element.likeCount)
							comment_analytics.yt = Number(element.commentCount)
						} else if (socialNet.name === 'Twitter') {
							favorite_analytics.tw = Number(element.favorite_count)
							like_analytics.tw = Number(element.favorite_count)
							comment_analytics.tw = Number(element.reply_count)
						}

						arrAnalytics.push({
							date: analytic.date,
							socialNetwork: socialNet.name,
							data: element,
						})
					})
				)
				return arrAnalytics
			})
		)

		// Calculate totals
		favorite_analytics.total =
			favorite_analytics.fb + favorite_analytics.yt + favorite_analytics.tw
		like_analytics.total =
			like_analytics.fb + like_analytics.yt + like_analytics.tw
		comment_analytics.total =
			comment_analytics.fb + comment_analytics.yt + comment_analytics.tw

		// Calculate compound stats
		res.push([
			{
				socialNetwork: 'Compound',
				data: {
					total_favorites: favorite_analytics,
					total_likes: like_analytics,
					total_comments: comment_analytics,
				},
			},
		])

		return res
	}

	upload = async () => {
		await this.save()
		return this
	}
}

module.exports = PublicationDAO
