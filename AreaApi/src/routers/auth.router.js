const express = require('express')
const AuthController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const TwitterController = require('../controllers/Services/twitter.controller')
const SpotifyController = require('../controllers/Services/spotify.controller')
const GithubController = require('../controllers/Services/github.controller')
const DropboxController = require('../controllers/Services/dropbox.controller')
const auth2Mid = require('../middleware/auth.service')

const router = express.Router()

const twitterAuth = auth2Mid.twitterAuth
const githubAuth = auth2Mid.githubAuth
const spotifyAuth = auth2Mid.spotifyAuth
const dropboxAuth = auth2Mid.dropboxAuth

/**
 * @typedef Token
 * @property {string} token.required - user's token
 */
/**
 * @typedef RegisterData
 * @property {string} name.required - user's name
 * @property {string} email.required - user's email
 * @property {string} password.required - user's password.
 */
/**
 * Register the user inside our service
 * @route POST /auth/register
 * @group Auth - User Registration
 * @param {RegisterData.model} user.body.required - The user informations
 * @returns {Token.model} 200 - JWT for the api
 * @returns {Error.model} 400 - {"message": "string"}
 * @returns {Error.model} 401 - {"message": "string"}
 * @returns {Error.model} 500 - {"message": "string"}
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
 * @returns {Token.model} 200 - JWT for the api
 * @returns {Error.model} 400 - {"message": "string"}
 * @returns {Error.model} 401 - {"message": "string"}
 * @returns {Error.model} 403 - {"message": "string"}
 * @returns {Error.model} 500 - {"message": "string"}
 */
router.post('/auth/login', async (req, res) => {
    await AuthController.login(req, res)
})

/**
 * Log the user to github, (you need to perfom it directly in the navigator)
 * @route GET /auth/github
 * @param {string} token.query.required - The client's api token
 * @param {string} cb.query.required - The client's call back url token
 * @group Auth - User Login
 */
router.get('/auth/github', auth2Mid.optAuth, auth2Mid.saveUrlCB, githubAuth)
router.get('/auth/github/callback', auth2Mid.getUrlCB, auth2Mid.getUser, githubAuth, GithubController.github)

/**
 * Log the user to dropbox, (you need to perfom it directly in the navigator) 
 * @route GET /auth/dropbox
 * @param {string} token.query.required - The client's api token
 * @param {string} cb.query.required - The client's call back url token
 * @group Auth - User Login
 */
router.get('/auth/dropbox', auth2Mid.auth, auth2Mid.saveUrlCB, dropboxAuth)
router.get('/auth/dropbox/callback', auth2Mid.getUrlCB, auth2Mid.getUser, dropboxAuth, DropboxController.dropbox)

/**
 * Log the user to spotify, (you need to perfom it directly in the navigator)
 * @route GET /auth/spotify
 * @param {string} token.query.required - The client's api token
 * @param {string} cb.query.required - The client's call back url token
 * @group Auth - User Login
 */
router.get('/auth/spotify', auth2Mid.auth, auth2Mid.saveUrlCB, spotifyAuth)
router.get('/auth/spotify/callback', auth2Mid.getUrlCB, auth2Mid.getUser, spotifyAuth, SpotifyController.spotify)

/**
 * Log the user to twitter (you need to perfom it directly in the navigator BUT NEEDS TO USE NGROK OR IT WILL NOT WORK)
 * @route GET /auth/twitter
 * @param {string} token.query.required - The client's api token
 * @param {string} cb.query.required - The client's call back url token
 * @group Auth - User Login
 */
router.get('/auth/twitter', auth2Mid.auth, auth2Mid.saveUrlCB, auth2Mid.saveToSession, twitterAuth, TwitterController.twitter)
router.get('/auth/twitter/callback', auth2Mid.getFromSession, auth2Mid.getUrlCB, auth2Mid.getUser, twitterAuth, TwitterController.twitter)

/**
 * Log the user to discord (you need to perfom it directly in the navigator)
 * @route GET /auth/discord
 * @group Auth - User Login
 */
router.get('/auth/discord', async (req, res) => {
    if (process.env.DISCORD_BOT_URL)
        res.redirect(process.env.DISCORD_BOT_URL || '')
    else
        res.status(404).send({message: 'Discord url not found'})
})

/**
 * Logout the user
 * @route POST /auth/logout
 * @security JWT
 * @group Auth - User Login
 * @returns {Error.model} 400 - {"message": "string"}
 * @returns {Error.model} 500 - {"message": "string"}
 */
router.post('/auth/logout', auth, async (req, res) => {
    AuthController.logOut(req, res)
})

/**
 * Logout from all the device the user
 * @route POST /auth/logoutAll
 * @security JWT
 * @group Auth - User Login
 * @returns {Error.model} 400 - {"message": "string"}
 * @returns {Error.model} 500 - {"message": "string"}
 */
router.post('/auth/logoutAll', auth, async (req, res) => {
    AuthController.logOutAll(req, res)
})


module.exports = router