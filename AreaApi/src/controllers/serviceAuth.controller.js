const ServiceAuthModel = require('../models/ServiceTokens.model')

exports.connect = async (user, serviceTokens, serviceId, res) => {
    try {
        const foundService = await ServiceAuthModel.findByServiceAndClientId(serviceId, user.id);
        if (foundService) {
            await ServiceAuthModel.remove(foundService[0].id)
        }
        const toSave = new ServiceAuthModel({
            client_id: user.id,
            service_id: serviceId,
            access_token: serviceTokens.access_token || null,
            refresh_token: serviceTokens.refresh_token || null,
            secret_token: serviceTokens.secret_token || null,
            expires_in: serviceTokens.expires_in || null
        })
        const resRequest = await ServiceAuthModel.create(toSave)
        res.status(200).send({ message: 'connected' })
    } catch (err) {
        res.status(403).send({ message: err.message || "An error occured" })
    }
}