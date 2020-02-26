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

const githubAuth = function (req, res, next){
    Passport.authenticate('github', {state: req.query.token})(req, res, next);
}

const trelloAuth = function (req, res, next){
    Passport.authenticate('trello', {state: req.query.token})(req, res, next);
}

const twitterAuth = function (req, res, next){
    Passport.authenticate('twitter', {state: req.query.token})(req, res, next);
}

const spotifyAuth = function (req, res, next){
    Passport.authenticate('spotify', {state: req.query.token})(req, res, next);
}

const dropboxAuth = function (req, res, next){
    Passport.authenticate('dropbox-oauth2', {state: req.query.token})(req, res, next);
}

module.exports = {
    auth,
    githubAuth,
    trelloAuth,
    twitterAuth,
    spotifyAuth,
    dropboxAuth
}