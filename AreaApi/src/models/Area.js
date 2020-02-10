const mongoose = require('mongoose')

const areaSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    serviceAction: {
        type: Schema.Types.ObjectId, 
        ref: 'Action', 
        required: true
    },
    serviceReaction: {
        type: Schema.Types.ObjectId, 
        ref: 'Reaction', 
        required: true
    },
    action: {
        type: Schema.Types.ObjectId, 
        ref: 'Action', 
        required: true
    },
    reaction: {
        type: Schema.Types.ObjectId, 
        ref: 'Reaction', 
        required: true
    },
    parameters: {
        type: JSON,
        requirerd: true
    }
})

const Area = mongoose.model('Area', areaSchema)

module.exports = Area