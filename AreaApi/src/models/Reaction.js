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


reactionSchema.statics.getAll = async () => {
    const reactions = await Reaction.find()
    return reactions;
}

reactionSchema.statics.getFromServiceId = async (service) => {
    const reactions = await Reaction.find( {service} );
    return reactions;
}

reactionSchema.statics.getById = async (id) => {
    const reactions = await Reaction.findById(id);
    if (!reactions) {
        throw new Error({ error: 'No reaction found' });
    }
    return reactions;
}

const Reaction = mongoose.model('Reaction', reactionSchema)

module.exports = Reaction