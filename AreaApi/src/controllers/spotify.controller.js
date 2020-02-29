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


// TODO REMOVE HERE !
exports.spotifyNewMusic = async function(area, action_result) {
    return false;
}


//NOTE =======================================================================

/**
 * Create specific data for the area (for exemple init a timer for this area)
 */
exports.createArea = async (area) => {
    try {
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Delete the area (specific for each service (for exemple , delete the timer inthe time table))
 * 
 * @param {JSON} - area
 */
exports.deleteArea = async (area) => {
    try {
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Call the appropriate reaction from area of the service
 * 
 * @param {JSON} actionResult - 
 */
exports.useReaction = async (actionResult, area) => {
}

/**
 * Init all the timers of the Service
 * 
 * @param {Express} app server express
 */
exports.init = async (app) => {
}