const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

/**
 * Create a user
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.create = async (req, res) => {
    // Create a new user
    try {
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return
        }
        if (!req.body.hasOwnProperty('email')) {
            res.status(400).send({message: "An email field is required"});
            return
        }
        if (!req.body.hasOwnProperty('name')) {
            res.status(400).send({message: "A name field is required"});
            return
        }
        if (!req.body.hasOwnProperty('password')) {
            res.status(400).send({message: "A password field is required"});
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
            res.status(401).send('not authorized')
        } else {
            const resToken = await Token.create(resUser.id)
            if (resToken)
                res.status(201).send(resToken)
            else
                res.status(500).send({ message: "Some error occurred while creating the User." })
        }

    } catch (error) {
        res.status(403).send({message: error.message || "Some error occurred while creating the User."})
    }
};

/**
 * Log a user
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.login = async (req, res) => {
    //Login a registered user
    try {
        if (!req.body) {
            res.status(400).send({message: "Content can not be empty!"});
            return
        }
        if (!req.body.hasOwnProperty('email')) {
            res.status(400).send({message: "An email field is required"});
            return
        }
        if (!req.body.hasOwnProperty('password')) {
            res.status(400).send({message: "A password field is required"});
            return
        }

        // Create a Customer
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        const resUser = await User.findByCredentials(user.email, user.password)

        if (!resUser) {
            res.status(401).send({message: 'not authorized'})
        } else {
            const resToken = await Token.create(resUser.id)
            if (!resToken)
                res.status(500).send({message: 'Some error occurred while logging the User.'})
            else
                res.status(200).send(resToken)
        }
    } catch (error) {
        res.status(403).send({message: error.message || "Some error occurred while logging the User."})
    }
};

/**
 * Logout the token of the user
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.logOut = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteToken(req.token)
        res.status(200).send({ message: 'User disconnected' })
    } catch (error) {
        res.status(500).send({message: error.message})
    }
};

/**
 * Log out all the tokens of the user
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.logOutAll = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteTokenByClientId(req.user.id)
        res.status(200).send({ message: 'User disconnected' })
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}