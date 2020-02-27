const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')

exports.dropbox = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('dropbox')
        if (!resService)
            throw new Error("Unkown service dropbox")

        ServiceAuthController.connect(
            req.userArea,
            {
                access_token: req.user.accessToken || null,
                refresh_token: req.user.refresh_token || null,
                secret_token: req.user.tokenSecret || null,
                expires_in: null,
            },
            resService.id,
            res
        )
        req.session.destroy()
    } catch (err) {
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
}