const express = require('express')
const AboutJs = require('../models/About')

const router = express.Router()

/**
 * @typedef ClientAbout
 * @property {string} host - user's ip
 */

/**
 * @typedef ActionAbout
 * @property {string} name - action's name
 * @property {string} description - action's description
 */

/**
 * @typedef ServiceAbout
 * @property {string} name - service's name
 * @property {Array.<Action>} actions - actions describing the service
 * @property {Array.<Action>} reactions - reactions describing the service
 */

/**
 * @typedef ServerAbout
 * @property {Int} current_time - server's current time
 * @property {Array.<Service>} services - all the services available
 */
 
/**
 * @typedef About
 * @property {ClientAbout.model} client - user's informations
 * @property {ServerAbout.model} server - server's informations
 */

/**
 * Get the about.json file with all the informations about the services
 * @route GET /about.json
 * @group About - About file
 * @returns {About.model} 200 - about file
 * @returns {Error}  default - Unexpected error
 */
router.get('/about.json', async (req, res) => {
    // Get the about.json
    try {
        var about = new AboutJs(req.ip);
        res.status(200).send(await about.getAboutJson())
    } catch (error) {
        res.status(401).send({ error: 'Failed to catch json object' })
    }
})

module.exports = router