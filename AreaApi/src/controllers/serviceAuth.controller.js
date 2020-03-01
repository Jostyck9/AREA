const ServiceAuthModel = require('../models/ServiceTokens.model')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')
const UrlConstruct = require('../models/UrlContructor.model')

/**
 * Connect the service with his token to the database
 * 
 * @async
 * @param {number} user_id the user's id
 * @param {JSON} serviceTokens the user's token from the service
 * @param {any} res the res
 */
exports.connect = async (user_id, serviceTokens, serviceId, redirectUrl, res) => {
    try {
        const foundService = await ServiceAuthModel.findByServiceAndClientId(serviceId, user_id);
        if (foundService) {
            await ServiceAuthModel.remove(foundService.id)
        }
        console.log(serviceTokens)
        const toSave = new ServiceAuthModel({
            client_id: user_id,
            service_id: serviceId,
            access_token: serviceTokens.access_token || null,
            refresh_token: serviceTokens.refresh_token || null,
            secret_token: serviceTokens.secret_token || null,
            expires_in: serviceTokens.expires_in || null
        })
        const resRequest = await ServiceAuthModel.create(toSave)
        if (res) {
            // res.status(200).send({ message: 'connected' })
            console.log(UrlConstruct.createRedirect(redirectUrl, 'OK', null, 'connected'))
            res.redirect(UrlConstruct.createRedirect(redirectUrl, 'OK', null, 'connected'))
        }
    } catch (err) {
        if (res) {
            console.log(err)
            res.redirect(UrlConstruct.createRedirect(redirectUrl, 'KO', null, 'errorTokens'))
        } else
            throw err
    }
}