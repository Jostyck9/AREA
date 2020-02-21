const express = require('express');
const auth = require('../middleware/auth')
const AreaController = require('../controllers/area.controller')

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
    AreaController.getAll(req, res)
})

/**
 * get informations for a specific area 
 * @route GET /area/{id}
 * @group Area - Area connections
 * @security JWT
 * @param {Int} id.path.require - id of the area
 * @returns {JSON} specified area
 * @returns {Error}  default - Unexpected error
 */
router.get('/area/:id', auth, async(req, res) => {
    // Get the area corresponding to the id
    AreaController.get(req, res)
})

/**
 * Delete a specific area 
 * @route DELETE /area/{id}
 * @group Area - Area connections
 * @security JWT
 * @param {Int} id.path.require - id of the area
 * @returns {Error}  default - Unexpected error
 */
router.delete('/area/:id', auth, async(req, res) => {
    // Get the area corresponding to the id
    AreaController.delete(req, res)
})

/**
 * @typedef Area
 * @property {integer} action_id - Area's action
 * @property {integer} reaction_id - Area's reaction
 * @property {json} parameters - Area's parameters format
 */
/**
 * Create an area between an action and a reaction 
 * @route POST /area
 * @group Area - Area connections
 * @param {Area.model} area.body.required - Area to create
 * @security JWT
 * @returns {Error}  default - Unexpected error
 */
router.post('/area', auth, async(req, res) => {
    AreaController.create(req, res)
})

module.exports = router;