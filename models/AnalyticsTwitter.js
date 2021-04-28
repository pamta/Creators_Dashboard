const mongoose = require('mongoose')

const TwitterAnalyticSchema = new mongoose.Schema({
	quote_count: {
        type: Number
    },
    reply_count: {
        type: Number
    },
    retweet_count: {
        type: Number
    },
    favorite_count: {
        type: Number
    }
})

module.exports = TwitterAnalytic = mongoose.model('twitterAnalytic', TwitterAnalyticSchema)
