const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')
const Passport = require('passport')

const auth = async (req, res, next) => {
    try {
        console.log('try to connect')
        const token = req.query.token
        const data = jwt.verify(token, process.env.JWT_KEY)

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()

        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

const authLogin = async (req, res, next) => {
    try {
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
        }
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
        console.log('try to connect')
        const token = req.query.token
        if (token) {
            const data = jwt.verify(token, process.env.JWT_KEY)

            const resToken = await Token.findByClientToken(token)
            if (!resToken)
                throw new Error()

            const resUser = await User.findById(resToken.client_id)
            if (!resUser)
                throw new Error()

            req.session.token = req.query.token
        }
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

const githubAuth = function (req, res, next) {
    if (req.query.token) {
        Passport.authenticate('github', { state: req.query.token, scope: ['user:email'] })(req, res, next);
    } else {
        Passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    }
}

const twitterAuth = function (req, res, next) {
    Passport.authenticate('twitter', { state: req.query.token })(req, res, next);
}

const spotifyAuth = function (req, res, next) {
    Passport.authenticate('spotify', { state: req.query.token })(req, res, next);
}

const dropboxAuth = function (req, res, next) {
    Passport.authenticate('dropbox-oauth2', { state: req.query.token })(req, res, next);
}

const facebookAuth = function (req, res, next) {
    Passport.authenticate('facebook', { state: req.query.token })(req, res, next);
}

module.exports = {
    auth,
    authCallback,
    authLogin,
    authLoginCallback,
    auth1,
    auth1Callback,
    githubAuth,
    twitterAuth,
    spotifyAuth,
    dropboxAuth,
    facebookAuth
}