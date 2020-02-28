const express = require('express')
const UserController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * Get the auth user informations
 * @route GET /me
 * @group User - User Data
 * @security JWT
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
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
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
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
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.patch('/me/username', auth, async (req, res) => {
    await UserController.updateUsername(req, res)
})

/**
 * Get name
 * @route GET /me/username
 * @group User - User Data
 * @security JWT
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.get('/me/username', auth, async (req, res) => {
    await UserController.getUsername(req, res)
})

/**
 * Get all the services auth and their status
 * @group User - User Data
 * @route GET /me/auth
 * @security JWT
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
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
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.get('/me/auth/:nameService', auth, async (req, res) => {
    await UserController.getAuthServiceStatus(req, res)
})

module.exports = router