const express = require('express');
const auth = require('../middleware/auth')
const AreaController = require('../controllers/area.controller')

const router = express.Router();

/**
 * Send a list of the user's Areas
 * @route GET /area
 * @group Area - Area connections
 * @security JWT
 * @returns {Array.<Area>} 200 - list of areas
 * @returns {Error.model} 404 - {"message": "string"}
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
 * @param {Int} id.path.required - id of the area
 * @returns {Area.model} 200 - specified area
 * @returns {Error.model} 404 - {"message": "string"}
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
 * @param {Int} id.path.required - id of the area
 * @returns {Error.model} 200 - {"message": "string"}
 * @returns {Error.model} 404 - {"message": "string"}
 */
router.delete('/area/:id', auth, async(req, res) => {
    // Get the area corresponding to the id
    AreaController.delete(req, res)
})

/**
 * @typedef Area
 * @property {integer} action_id - Area's action
 * @property {integer} reaction_id - Area's reaction
 * @property {json} parameters_action - Area's reaction parameters format
 * @property {json} parameters_reaction - Area's reaction parameters format
 */
/**
 * Create an area between an action and a reaction 
 * @route POST /area
 * @group Area - Area connections
 * @param {Area.model} area.body.required - Area to create
 * @security JWT
 * @returns {Error.model} 201 - {"message": "string"}
 * @returns {Error.model} 400 - {"message": "string"}
 */
router.post('/area', auth, async(req, res) => {
    AreaController.create(req, res)
})

module.exports = router;