const express = require('express');
const auth = require('../middleware/auth')

const router = express.Router();

/**
 * Send a list of the user's Areas
 * @route GET /area
 * @group Area - Area connections
 * @security JWT
 * @returns {JSON} list of areas
 * @returns {Error}  default - Unexpected error
 */
router.get('/area', auth, async(req, res) => {
    // Get a list of user's Areas
    try { 
        res.status(200).send("ListofUser'sAreas");
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * get informations for a specific area 
 * @route GET /area/{id}
 * @group Area - Area connections
 * @security JWT
 * @param {var} idArea - id of the researched area
 * @returns {JSON} specified area
 * @returns {Error}  default - Unexpected error
 */
router.get('/area/:id', auth, async(req, res) => {
    // Get the area corresponding to the id
    try { 
        res.status(200).send(" Get the area corresponding to the id");
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Delete a specific area 
 * @route DELETE /area/{id}
 * @group Area - Area connections
 * @security JWT
 * @param {var} idArea - id of the researched area
 * @returns {Error}  default - Unexpected error
 */
router.delete('/area/:id', auth, async(req, res) => {
    // Get the area corresponding to the id
    try { 
        res.status(200).send("Delete the area corresponding to the id");
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Create an area between an action and a reaction 
 * @route POST /area
 * @group Area - Area connections
 * @security JWT
 * @returns {Error}  default - Unexpected error
 */
router.post('/area', auth, async(req, res) => {
    try { 
        res.status(200).send(" Create an area ");
    } catch (error) {
        res.status(401).send(error);
    }
})

module.exports = router;