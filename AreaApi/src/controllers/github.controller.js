const ServiceAuthController = require('./serviceAuth.controller')
const ApiAuth = require('./auth.controller')
const ServiceModel = require('../models/Service.model')

/**
 * github connect the token received to the database but also connect or register a user to the api
 * 
 * @param {any} req the request
 * @param {any} res the res
 */
exports.github = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('github')
        if (!resService)
            throw new Error("Unkown service github")
        if (req.userArea) {
            ServiceAuthController.connect(
                req.userArea.id,
                {
                    access_token: req.user.accessToken || null,
                    refresh_token: req.user.refresh_token || null,
                    secret_token: req.user.tokenSecret || null,
                    expires_in: null,
                },
                resService.id,
                req.urlCallback.url,
                res
            )
        } else {
            
            await ApiAuth.loginRegisterOAuth2(
                {
                    username: req.user.profile.username,
                    idLog: req.user.profile.id
                },
                {
                    access_token: req.user.accessToken || null,
                    refresh_token: req.user.refresh_token || null,
                    secret_token: req.user.tokenSecret || null,
                    expires_in: null,
                },
                resService.id,
                req.urlCallback.url,
                res
            )
        }
        req.session.destroy()
    } catch (err) {
        req.session.destroy()
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
} 