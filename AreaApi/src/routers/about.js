const express = require('express')

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
    console.log("about")
    var about = 'about hello'
    res.status(200).send({ about })
})

module.exports = router