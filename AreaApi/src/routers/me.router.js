const express = require('express')
const UserController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * @typedef UserData
 * @property {string} username
 * @property {string} email
 * @property {boolean} is_oauth2
 */
/**
 * Get the auth user informations
 * @route GET /me
 * @group User - User Data
 * @security JWT
 * @returns {UserData.model} 200
 * @returns {Error.model} 403 - {"message": "string"}
 */
router.get('/me', auth, async (req, res) => {
    await UserController.getMe(req, res)
})

/**
 * @typedef Password
 * @property {string} password.required - user's password
 */
/**
 * Update password
 * @route PATCH /me/password
 * @group User - User Data
 * @security JWT
 * @param {Password.model} register.body.required - The user informations
 * @returns {Error.model} 200 - {"message": "string"}
 * @returns {Error.model} 403 - {"message": "string"}
 */
router.patch('/me/password', auth, async (req, res) => {
    await UserController.updatePassword(req, res)
})

/**
 * @typedef UserName
 * @property {string} username.required - user's name
 */
/**
 * Update username
 * @route PATCH /me/username
 * @group User - User Data
 * @security JWT
 * @param {UserName.model} register.body.required - The user informations
 * @returns {Error.model} 200 - {"message": "string"}
 * @returns {Error.model} 403 - {"message": "string"}
 */
router.patch('/me/username', auth, async (req, res) => {
    await UserController.updateUsername(req, res)
})

/**
 * Get name
 * @route GET /me/username
 * @group User - User Data
 * @security JWT
 * @returns {Error.model} 200 - {"username": "string"}
 * @returns {Error.model} 403 - {"message": "string"}
 */
router.get('/me/username', auth, async (req, res) => {
    await UserController.getUsername(req, res)
})

/**
 * @typedef ServiceConnection
 * @property {string} name
 * @property {boolean} isConnected
 */
/**
 * Get all the services auth and their status
 * @group User - User Data
 * @route GET /me/auth
 * @security JWT
 * @returns {Array.<ServiceConnection>} 200 - Array of the several services
 * @returns {Error} 403 - {"message": "string"}
 */
router.get('/me/auth', auth, async (req, res) => {
    await UserController.getAllAuthServiceStatus(req, res)
})

/**
 * Get all the services auth and their status
 * @group User - User Data
 * @route GET /me/auth/{nameService}
 * @param {string} nameService.path.required - Name of the service
 * @security JWT
 * @returns {ServiceConnection.model} 200 - The service detail for connection
 * @returns {Error} 403 - {"message": "string"}
 */
router.get('/me/auth/:nameService', auth, async (req, res) => {
    await UserController.getAuthServiceStatus(req, res)
})

module.exports = router