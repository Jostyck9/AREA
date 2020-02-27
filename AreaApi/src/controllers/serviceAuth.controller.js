const ServiceAuthModel = require('../models/ServiceTokens.model')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

/**
 * Connect the service with his token to the database
 * 
 * @param {number} user_id the user's id
 * @param {JSON} serviceTokens the user's token from the service
 * @param {any} res the res
 */
exports.connect = async (user_id, serviceTokens, serviceId, res) => {
    try {
        const foundService = await ServiceAuthModel.findByServiceAndClientId(serviceId, user_id);
        if (foundService) {
            await ServiceAuthModel.remove(foundService[0].id)
        }
        const toSave = new ServiceAuthModel({
            client_id: user_id,
            service_id: serviceId,
            access_token: serviceTokens.access_token || null,
            refresh_token: serviceTokens.refresh_token || null,
            secret_token: serviceTokens.secret_token || null,
            expires_in: serviceTokens.expires_in || null
        })
        const resRequest = await ServiceAuthModel.create(toSave)
        if (res)
            res.status(200).send({ message: 'connected' })
    } catch (err) {
        if (res)
            res.status(403).send({ message: err.message || "An error occured" })
        else
            throw err
    }
}