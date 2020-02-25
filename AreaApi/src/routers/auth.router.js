const express = require('express')
const AuthController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const Passport = require('passport')

const TwitterController = require('../controllers/twitter.controller')
const SpotifyController = require('../controllers/spotify.controller')
const GithubController = require('../controllers/github.controller')
const TrelloController = require('../controllers/trello.controller')
const auth2Middleware = require('../middleware/auth.service')

const router = express.Router()

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = Passport.authenticate('twitter')
const githubAuth = Passport.authenticate('github')
const trelloAuth = Passport.authenticate('trello')
const spotifyAuth = Passport.authenticate('spotify')

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
    await AuthController.create(req, res)
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
    await AuthController.login(req, res)
})

/**
 * Log the user to microsoft
 * @route POST /auth/login/microsoft
 * @group User - User Login
 */
router.post('/auth/login/microsoft', async (req, res) => {
    // await AuthController.login(req, res)
})

/**
 * Log the user to github
 * @route GET /auth/github
 * @group User - User Login
 * @security JWT
 */
router.get('/auth/github', auth2Middleware, githubAuth, GithubController.github)
router.get('/auth/github/callback', githubAuth, GithubController.github)

/**
 * Log the user to trello
 * @route GET /auth/trello
 * @group User - User Login
 */
router.get('/auth/trello', auth2Middleware, trelloAuth, TrelloController.trello)
router.get('/auth/trello/callback', TrelloController.trello)

/**
 * Log the user to spotify
 * @route GET /auth/spotify
 * @group User - User Login
 */
router.get('/auth/spotify', auth2Middleware, spotifyAuth, SpotifyController.spotify)
router.get('/auth/spotify/callback', spotifyAuth, SpotifyController.spotify)

/**
 * Log the user to discord
 * @route POST /auth/login/discord
 * @group User - User Login
 * @security JWT
 */
router.post('/auth/login/discord', async (req, res) => {
    // await AuthController.login(req, res)
})


/**
 * Log the user to twitter
 * @route GET /auth/login/twitter
 * @group User - User Login
 */
router.get('/auth/twitter', auth2Middleware, twitterAuth, TwitterController.twitter)
router.get('/auth/twitter/callback', twitterAuth, TwitterController.twitter)

/**
 * Logout the user
 * @route POST /auth/logout
 * @security JWT
 * @group User - User Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/logout', auth, async (req, res) => {
    AuthController.logOut(req, res)
})

/**
 * Logout from all the device the user
 * @route POST /auth/logoutAll
 * @security JWT
 * @group User - User Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/logoutAll', auth, async (req, res) => {
    AuthController.logOutAll(req, res)
})


module.exports = router