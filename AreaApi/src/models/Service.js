const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

serviceSchema.statics.getAll = async () => {
    const services = await Service.find()
    return services;
}

serviceSchema.statics.getByName = async (name) => {
    const service = await Service.findOne({name});
    if (!service) {
        throw new Error({ error: 'No service found' })
    }
    return service
}

serviceSchema.statics.getById = async (id) => {
    const service = await Service.findById(id);
    if (!service) {
        throw new Error({ error: 'No service found' })
    }
    return service
}

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service