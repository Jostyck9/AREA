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
 * Log the user to microsoft
 * @route POST /auth/login/microsoft
 * @group User - User Login
 */
router.post('/auth/login/microsoft', async (req, res) => {
    // await UserController.login(req, res)
})

/**
 * Log the user to github
 * @route POST /auth/login/github
 * @group User - User Login
 * @security JWT
 */
router.post('/auth/login/github', async (req, res) => {
    // await UserController.login(req, res)
})

/**
 * Log the user to trello
 * @route POST /auth/login/trello
 * @group User - User Login
 * @security JWT
 */
router.post('/auth/login/trello', async (req, res) => {
    // await UserController.login(req, res)
})

/**
 * Log the user to spotify
 * @route POST /auth/login/spotify
 * @group User - User Login
 * @security JWT
 */
router.post('/auth/login/spotify', async (req, res) => {
    // await UserController.login(req, res)
})

/**
 * Log the user to discord
 * @route POST /auth/login/discord
 * @group User - User Login
 * @security JWT
 */
router.post('/auth/login/discord', async (req, res) => {
    // await UserController.login(req, res)
})

/**
 * Log the user to twitter
 * @route POST /auth/login/twitter
 * @group User - User Login
 * @security JWT
 */
router.post('/auth/login/twitter', async (req, res) => {
    // await UserController.login(req, res)
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

/**
 * Logout from all the device the user
 * @route POST /auth/logoutAll
 * @security JWT
 * @group User - User Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/logoutAll', auth, async (req, res) => {
    UserController.logOutAll(req, res)
})


module.exports = router