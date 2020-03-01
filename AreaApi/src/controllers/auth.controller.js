const ServiceAuthController = require('./serviceAuth.controller')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')
const UrlConstruct = require('../models/UrlContructor.model')

/**
 * Create a user
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.create = async (req, res) => {
    // Create a new user
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        if (!req.body.hasOwnProperty('email')) {
            res.status(400).send({ message: "An email field is required" });
            return
        }
        if (!req.body.hasOwnProperty('name')) {
            res.status(400).send({ message: "A name field is required" });
            return
        }
        if (!req.body.hasOwnProperty('password')) {
            res.status(400).send({ message: "A password field is required" });
            return
        }
        // Create a Customer
        const user = new User({
            email: req.body.email,
            username: req.body.name,
            password: req.body.password
        });

        const resUser = await User.create(user)
        if (!resUser) {
            res.status(401).send({ message: 'not authorized' })
        } else {
            const resToken = await Token.create(resUser.id)
            if (resToken)
                res.status(201).send(resToken)
            else
                res.status(500).send({ message: "Some error occurred while creating the User." })
        }

    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occurred while creating the User." })
    }
};

/**
 * Create a user by OAuth2
 * 
 * @async
 * @param {JSON} userInfo The info of the user with a username and a idLog
 * @param {JSON} tokens The tokens of the auth service with an access_token, a refresh_token, a secret_token and an expires_in
 * @param {number} service_id The id of the service
 * @param {Response<any>} res The result of the request to send after
 */
exports.loginRegisterOAuth2 = async (userInfo, tokens, service_id, redirectUrl, res) => {
    try {
        if (!userInfo.hasOwnProperty('username'))
            throw new Error('No username given for login by service')
        if (!userInfo.hasOwnProperty('idLog'))
            throw new Error('No unique id given for login by service')

        let userId = 0
        const resMail = await User.findByEmail(userInfo.idLog)
        if (!resMail) {
            const resCreate = await User.createOAuth2({ username: userInfo.username, id: userInfo.idLog })
            userId = resCreate.id
        } else {
            userId = resMail.id
        }

        await ServiceAuthController.connect(
            userId,
            tokens,
            service_id,
            redirectUrl,
            null
        )


        //create token
        const resToken = await Token.create(userId)
        if (resToken)
            res.redirect(UrlConstruct.createRedirect(redirectUrl, 'OK', resToken.token, null))
        else
            res.redirect(UrlConstruct.createRedirect(redirectUrl, 'KO', null, null))

    } catch (error) {
        console.log(error)
        res.redirect(UrlConstruct.createRedirect(redirectUrl, 'KO', null, null))
    }
}

/**
 * Log a user
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.login = async (req, res) => {
    //Login a registered user
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        if (!req.body.hasOwnProperty('email')) {
            res.status(400).send({ message: "An email field is required" });
            return
        }
        if (!req.body.hasOwnProperty('password')) {
            res.status(400).send({ message: "A password field is required" });
            return
        }

        // Create a Customer
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        const resUser = await User.findByCredentials(user.email, user.password)

        if (!resUser) {
            res.status(401).send({ message: 'not authorized' })
        } else {
            const resToken = await Token.create(resUser.id)
            if (!resToken)
                res.status(500).send({ message: 'Some error occurred while logging the User.' })
            else
                res.status(200).send(resToken)
        }
    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occurred while logging the User." })
    }
};

/**
 * Logout the token of the user
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.logOut = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteToken(req.token)
        res.status(200).send({ message: 'User disconnected' })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};

/**
 * Log out all the tokens of the user
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.logOutAll = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteTokenByClientId(req.user.id)
        res.status(200).send({ message: 'User disconnected' })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}