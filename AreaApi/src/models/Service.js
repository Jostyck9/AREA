const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service