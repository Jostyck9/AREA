const mongoose = require('mongoose')

const reactionSchema = mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    parameters: {
        type: JSON,
        required: true
    }
})

const Reaction = mongoose.model('Reaction', reactionSchema)

module.exports = Reaction