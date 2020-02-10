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

actionSchema.statics.getAll = async () => {
    const actions = await Action.find()
    if (!actions) {
        throw new Error({ error: 'No action found' });
    }
    return actions;
}

actionSchema.statics.getFromServiceId = async (service) => {
    const actions = await Action.find( {service} );
    if (!actions) {
        throw new Error({ error: 'No action found' });
    }
    return actions;
}

actionSchema.statics.getById = async (id) => {
    const actions = await Action.findById(id);
    if (!actions) {
        throw new Error({ error: 'No action found' });
    }
    return actions;
}

const Action = mongoose.model('Action', actionSchema)

module.exports = Action