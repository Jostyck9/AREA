const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')
const Passport = require('passport')
const UrlCallbackModel = require('../models/UrlCallback.model')

/**
 * Midllewre for authentification, check if the token and the cb is valid
 * 
 * @async
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const auth = async (req, res, next) => {
    try {
        if (!req.query.hasOwnProperty('cb')) {
            res.status(400).send({ message: 'missing cb url' })
            return
        }
        if (!req.query.hasOwnProperty('token')) {
            res.status(400).send({ message: 'missing token' })
            return
        }
        console.log('try to connect')
        const token = req.query.token
        const data = jwt.verify(token, process.env.JWT_KEY || '')

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()

        req.userArea = resUser
        req.urlCallback = req.query.cb
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

/**
 * Check if the token is valid but he is not mandatory
 * 
 * @async
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const optAuth = async (req, res, next) => {
    try {
        if (!req.query.hasOwnProperty('cb')) {
            res.status(400).send({ message: 'missing cb url' })
            return
        }
        console.log('try to connect')
        if (req.query.token) {
            const token = req.query.token
            const data = jwt.verify(token, process.env.JWT_KEY || '')

            const resToken = await Token.findByClientToken(token)
            if (!resToken)
                throw new Error()

            const resUser = await User.findById(resToken.client_id)
            if (!resUser)
                throw new Error()
            req.userArea = resUser
        }
        req.urlCallback = req.query.cb
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

/**
 * Save the Url callback inside the table to the appropriate user
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const saveUrlCB = async (req, res, next) => {
    try {
        let userId = null
        if (req.userArea) {
            userId = req.userArea.id || null
        }
        const newUrl = new UrlCallbackModel({
            urlCallback: req.urlCallback,
            clientId: userId
        });
        const resUrl = await UrlCallbackModel.create(newUrl)
        req.urlId = resUrl.idUrl
        next()
    } catch (error) {
        res.status(500).send({ message: 'An internal error occured' })
    }
}

/**
 * Save the url Id inside the session (only usefull for OAuth1)
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const saveToSession = async (req, res, next) => {
    try {
        req.session.urlId = req.urlId
        next()
    } catch (error) {
        res.status(500).send({ message: 'An internal error occured' })
    }
}


// NOTE from here for CALLBACK AUTH2

/**
 * Set the idUrl from session to the query
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const getFromSession = async (req, res, next) => {
    let urlId = null
    if (req.session) {
        urlId = req.session.urlId
        req.query.state = urlId
    }
    next()
}

/**
 * Get the url callback into req from query
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const getUrlCB = async (req, res, next) => {
    try {
        if (!req.query.state) {
            console.error('No urlId found in query')
            throw new Error()
        }
        const resUrl = await UrlCallbackModel.findByUrlId(req.query.state)
        if (!resUrl)
            throw new Error()
        req.urlCallback = resUrl
        await UrlCallbackModel.deleteByUrlId(req.query.state)
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

/**
 * Get the user from the token
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const getUser = async (req, res, next) => {
    try {
        console.log("user")
        if (!req.urlCallback) {
            console.error('No urlId found in request')
            throw new Error()
        }

        const resUser = await User.findById(req.urlCallback.client_id)
        if (resUser)
            req.userArea = resUser
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

/* Passport middleware for score and auth */

const githubAuth = function (req, res, next) {
    Passport.authenticate('github', { state: req.urlId, scope: ['user:email', 'repo', 'admin:repo_hook'] })(req, res, next);
}

const twitterAuth = function (req, res, next) {
    Passport.authenticate('twitter', { state: req.urlId })(req, res, next);
}

const spotifyAuth = function (req, res, next) {
    Passport.authenticate('spotify', { state: req.urlId, scope: ['user-modify-playback-state', 'playlist-modify-public', 'playlist-modify-private', 'app-remote-control', 'playlist-read-private'] })(req, res, next);
}

const dropboxAuth = function (req, res, next) {
    Passport.authenticate('dropbox-oauth2', { state: req.urlId })(req, res, next);
}

const facebookAuth = function (req, res, next) {
    Passport.authenticate('facebook', { state: req.urlId })(req, res, next);
}

module.exports = {
    auth,
    optAuth,
    saveToSession,
    getFromSession,
    getUrlCB,
    saveUrlCB,
    getUser,
    githubAuth,
    twitterAuth,
    spotifyAuth,
    dropboxAuth,
    facebookAuth
}