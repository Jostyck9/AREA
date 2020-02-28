const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')

/**
 * spotify connect the token received to the database
 * 
 * @param {any} req the request
 * @param {any} res the res
 */
exports.spotify = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('spotify')
        if (!resService)
            throw new Error("Unkown service spotify")

        console.log('Begin')
        ServiceAuthController.connect(
            req.userArea.id,
            {
                access_token: req.user.accessToken || null,
                refresh_token: req.user.refresh_token || null,
                secret_token: req.user.tokenSecret || null,
                expires_in: req.user.expiresIn || null,
            },
            resService.id,
            req.urlCallback.url,
            res
        )
        req.session.destroy()
    } catch (err) {
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
}
