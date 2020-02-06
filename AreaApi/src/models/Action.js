const mongoose = require('mongoose')

const actionSchema = mongoose.Schema({
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
    res: {
        type: JSON,
        required: true
    }
})

const Action = mongoose.model('Action', actionSchema)

module.exports = Action