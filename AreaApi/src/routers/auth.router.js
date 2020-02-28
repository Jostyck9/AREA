const express = require('express')
const AuthController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const Passport = require('passport')

const TwitterController = require('../controllers/twitter.controller')
const SpotifyController = require('../controllers/spotify.controller')
const GithubController = require('../controllers/github.controller')
const DropboxController = require('../controllers/dropbox.controller')
const FacebookController = require('../controllers/facebook.controller')
const auth2Mid = require('../middleware/auth.service')

const router = express.Router()

const twitterAuth = auth2Mid.twitterAuth
const githubAuth = auth2Mid.githubAuth
const spotifyAuth = auth2Mid.spotifyAuth
const dropboxAuth = auth2Mid.dropboxAuth
const facebookAuth = auth2Mid.facebookAuth

/**
 * @typedef RegisterData
 * @property {string} name.required - user's name
 * @property {string} email.required - user's email
 * @property {string} password.required - user's password.
 */
/**
 * Register the user inside the db
 * @route POST /auth/register
 * @group Auth - User Registration
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
 * @group Auth - User Login
 * @param {LoginData.model} login.body.required - The user informations
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/login', async (req, res) => {
    await AuthController.login(req, res)
})

/**
 * Log the user to github
 * @route GET /auth/github
 * @param {string} token.query.required - The user's api token
 * @group Auth - User Login
 */
router.get('/auth/github', auth2Mid.optAuth, auth2Mid.saveUrlCB, githubAuth)
router.get('/auth/github/callback', auth2Mid.getUrlCB, auth2Mid.getUser, githubAuth, GithubController.github)

/**
 * Log the user to dropbox
 * @route GET /auth/dropbox
 * @group Auth - User Login
 */
router.get('/auth/dropbox', auth2Mid.auth, auth2Mid.saveUrlCB, dropboxAuth)
router.get('/auth/dropbox/callback', auth2Mid.getUrlCB, auth2Mid.getUser, dropboxAuth, DropboxController.dropbox)

/**
 * Log the user to facebook
 * @route GET /auth/facebook
 * @group Auth - User Login
 */
// router.get('/auth/facebook', auth2Mid.auth, facebookAuth)
// router.get('/auth/facebook/callback', auth2Mid.authCallback, facebookAuth, FacebookController.facebook)

/**
 * Log the user to spotify
 * @route GET /auth/spotify
 * @group Auth - User Login
 */
router.get('/auth/spotify', auth2Mid.auth, auth2Mid.saveUrlCB, spotifyAuth)
router.get('/auth/spotify/callback', auth2Mid.getUrlCB, auth2Mid.getUser, spotifyAuth, SpotifyController.spotify)

/**
 * Log the user to twitter BUT NEEDS TO USE NGROK OR WILL NOT WORK
 * @route GET /auth/twitter
 * @group Auth - User Login
 */
router.get('/auth/twitter', auth2Mid.auth, auth2Mid.saveUrlCB, auth2Mid.saveToSession, twitterAuth, TwitterController.twitter)
router.get('/auth/twitter/callback', auth2Mid.getFromSession, auth2Mid.getUrlCB, auth2Mid.getUser, twitterAuth, TwitterController.twitter)

/**
 * Log the user to discord
 * @route GET /auth/discord
 * @group Auth - User Login
 */
router.get('/auth/discord', async (req, res) => {
    res.status(200).send({message: 'Hello discord'})
    // await AuthController.login(req, res)
})

/**
 * Logout the user
 * @route POST /auth/logout
 * @security JWT
 * @group Auth - User Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/logout', auth, async (req, res) => {
    AuthController.logOut(req, res)
})

/**
 * Logout from all the device the user
 * @route POST /auth/logoutAll
 * @security JWT
 * @group Auth - User Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/logoutAll', auth, async (req, res) => {
    AuthController.logOutAll(req, res)
})


module.exports = router