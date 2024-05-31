const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
          },
        artist: {
            type: String,
            required: true,
          },
          author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
)

module.exports = mongoose.model('Track', trackSchema)