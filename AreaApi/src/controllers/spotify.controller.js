const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')

exports.spotify = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('spotify')
        if (!resService)
            throw new Error("Unkown service spotify")

        ServiceAuthController.connect(
            req.userArea,
            {
                access_token: req.user.accessToken || null,
                refresh_token: req.user.refresh_token || null,
                secret_token: req.user.tokenSecret || null,
                expires_in: req.user.expiresIn || null,
            },
            resService.id,
            res
        )
        req.session.destroy()
    } catch (err) {
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
}
