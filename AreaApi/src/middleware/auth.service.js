const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')
const Passport = require('passport')
const UrlCallbackModel = require('../models/UrlCallback.model')

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
        const data = jwt.verify(token, process.env.JWT_KEY)

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

const authLogin = async (req, res, next) => {
    try {
        if (!req.query.hasOwnProperty('cb')) {
            res.status(400).send({ message: 'missing cb url' })
            return
        }
        console.log('try to connect')
        if (req.query.token) {
            const token = req.query.token
            const data = jwt.verify(token, process.env.JWT_KEY)

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

const authLoginCallback = async (req, res, next) => {
    try {
        if (req.query.state) {
            const token = req.query.state
            const data = jwt.verify(token, process.env.JWT_KEY)

            const resToken = await Token.findByClientToken(token)
            if (!resToken)
                throw new Error()

            const resUser = await User.findById(resToken.client_id)
            if (!resUser)
                throw new Error()

            req.userArea = resUser
        }
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

const authCallback = async (req, res, next) => {
    try {
        const token = req.query.state
        const data = jwt.verify(token, process.env.JWT_KEY)

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()

        req.userArea = resUser
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

const auth1 = async (req, res, next) => {
    try {
        req.session.urlId = req.urlId
        console.log('session : ' + req.session.urlId)
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

const auth1Callback = async (req, res, next) => {
    try {
        console.log('try to connect')
        const token = req.session.token
        const data = jwt.verify(token, process.env.JWT_KEY)

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()
        req.userArea = resUser
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

const saveUrlCallback = async (req, res, next) => {
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
        console.log(resUrl)
        req.urlId = resUrl.idUrl
        console.log(req.urlId)
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

const githubAuth = function (req, res, next) {
    Passport.authenticate('github', { state: req.urlId, scope: ['user:email'] })(req, res, next);
}

const twitterAuth = function (req, res, next) {
    Passport.authenticate('twitter', { state: req.urlId })(req, res, next);
}

const spotifyAuth = function (req, res, next) {
    Passport.authenticate('spotify', { state: req.urlId })(req, res, next);
}

const dropboxAuth = function (req, res, next) {
    Passport.authenticate('dropbox-oauth2', { state: req.urlId })(req, res, next);
}

const facebookAuth = function (req, res, next) {
    Passport.authenticate('facebook', { state: req.urlId })(req, res, next);
}

module.exports = {
    auth,
    authCallback,
    authLogin,
    authLoginCallback,
    auth1,
    auth1Callback,
    saveUrlCallback,
    githubAuth,
    twitterAuth,
    spotifyAuth,
    dropboxAuth,
    facebookAuth
}