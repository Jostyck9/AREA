const express = require('express');

const router = express.Router();

/**
 * Send a list of the user's Areas
 * @route GET /area
 * @param {RegisterData.model} register.body.required - The user informations
 * @returns {JSON} list of areas
 * @returns {Error}  default - Unexpected error
 */
router.get('/area', async(req, res) => {
    // Get a list of user's Areas
    try { 
        res.status(200).send("ListofUser'sAreas");
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Send specific area 
 * @route GET /area/:id
 * @param {var} idArea - id of the researched area
 * @returns {JSON} specified area
 * @returns {Error}  default - Unexpected error
 */
router.get('/area/:id', async(req, res) => {
    // Get the area corresponding to the id
    try { 
        res.status(200).send(" Get the area corresponding to the id");
    } catch (error) {
        res.status(401).send(error);
    }
})

module.exports = router;