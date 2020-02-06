const express = require('express')
const AboutJs = require('../models/About')

const router = express.Router()

/**
 * Get the about.json file with all the informations about the services
 * @route GET /about.json
 * @group About - About file
 * @returns {JSON} 200 - about file
 * @returns {Error}  default - Unexpected error
 */
router.get('/about.json', async (req, res) => {
    // Get the about.json
    var about = new AboutJs(req.ip);
    res.status(200).send(await about.getAboutJson())
})

module.exports = router