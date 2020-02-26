const express = require('express')
const AuthController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const Passport = require('passport')

const MicrosoftController = require('../controllers/microsoft.controller')
const TwitterController = require('../controllers/twitter.controller')
const SpotifyController = require('../controllers/spotify.controller')
const GithubController = require('../controllers/github.controller')
const TrelloController = require('../controllers/trello.controller')
const DropboxController = require('../controllers/dropbox.controller')
const FacebookController = require('../controllers/facebook.controller')
const auth2Middleware = require('../middleware/auth.service')

const router = express.Router()

const twitterAuth = auth2Middleware.twitterAuth
const githubAuth = auth2Middleware.githubAuth
const trelloAuth = auth2Middleware.trelloAuth
const spotifyAuth = auth2Middleware.spotifyAuth
const dropboxAuth = auth2Middleware.dropboxAuth
const facebookAuth = auth2Middleware.facebookAuth
const microsoftAuth = Passport.authenticate('azure_ad_oauth2')

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
 * @route GET /auth/login/microsoft
 * @group User - User Login
 */
router.get('/auth/microsoft', auth2Middleware.auth, microsoftAuth, MicrosoftController.microsoft)
router.get('/auth/microsoft/callback', microsoftAuth, MicrosoftController.microsoft)

/**
 * Log the user to github
 * @route GET /auth/github
 * @group User - User Login
 */
router.get('/auth/github', auth2Middleware.auth, githubAuth, GithubController.github)
router.get('/auth/github/callback', githubAuth, GithubController.github)

/**
 * Log the user to dropbox
 * @route GET /auth/dropbox
 * @group User - User Login
 */
router.get('/auth/dropbox', auth2Middleware.auth, dropboxAuth, DropboxController.dropbox)
router.get('/auth/dropbox/callback', dropboxAuth, DropboxController.dropbox)

/**
 * Log the user to facebook
 * @route GET /auth/facebook
 * @group User - User Login
 */
router.get('/auth/facebook', auth2Middleware.auth, facebookAuth, FacebookController.facebook)
router.get('/auth/facebook/callback', facebookAuth, FacebookController.facebook)

/**
 * Log the user to trello
 * @route GET /auth/trello
 * @group User - User Login
 */
router.get('/auth/trello', auth2Middleware.auth, trelloAuth, TrelloController.trello)
router.get('/auth/trello/callback', trelloAuth, TrelloController.trello)

/**
 * Log the user to spotify
 * @route GET /auth/spotify
 * @group User - User Login
 */
router.get('/auth/spotify', auth2Middleware.auth, spotifyAuth, SpotifyController.spotify)
router.get('/auth/spotify/callback', spotifyAuth, SpotifyController.spotify)

/**
 * Log the user to discord
 * @route POST /auth/login/discord
 * @group User - User Login
 */
router.post('/auth/login/discord', async (req, res) => {
    // await AuthController.login(req, res)
})


/**
 * Log the user to twitter
 * @route GET /auth/login/twitter
 * @group User - User Login
 */
router.get('/auth/twitter', auth2Middleware.auth, twitterAuth, TwitterController.twitter)
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