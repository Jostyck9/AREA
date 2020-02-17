const express = require('express')
const UserController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * @typedef RegisterData
 * @property {string} name.required - user's name
 * @property {string} email.required - user's email
 * @property {string} password.required - user's password.
 */
/**
 * Register the user inside the db
 * @route POST /auth/register
 * @group User - User Registration
 * @param {RegisterData.model} register.body.required - The user informations
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/register', async (req, res) => {
    await UserController.create(req, res)
})

/**
 * @typedef LoginData
 * @property {string} email.required - user's email
 * @property {string} password.required - user's password.
 */

/**
 * Log the user
 * @route POST /auth/login
 * @group User - User Login
 * @param {LoginData.model} login.body.required - The user informations
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/login', async (req, res) => {
    await UserController.login(req, res)
})

/**
 * Logout the user
 * @route POST /auth/logout
 * @security JWT
 * @group User - User Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/logout', auth, async (req, res) => {
    UserController.logOut(req, res)
})

module.exports = router