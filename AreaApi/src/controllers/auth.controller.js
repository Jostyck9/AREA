const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

exports.create = async (req, res) => {
    // Create a new user
    console.log("User trying to create")
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
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
                res.status(200).send(resToken)
            else
                res.status(500).send({ message: "Some error occurred while creating the User." })
        }

    } catch (error) {
        res.status(400).send(error.message || "Some error occurred while creating the User.")
    }
};

exports.login = async (req, res) => {
    //Login a registered user
    console.log("User trying to connect")
    try {
        if (!req.body) {
            throw new Error("Content can not be empty!")
        }
        // Create a Customer
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        const resUser = await User.findByCredentials(user.email, user.password)

        if (!resUser) {
            res.status(401).send('not authorized')
        } else {
            const resToken = await Token.create(resUser.id)
            if (!resToken)
                res.status(401).send('not authorized')
            else
                res.status(200).send(resToken)
        }
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.logOut = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteToken(req.token)
        res.status(200).send({ message: 'User deconnected' })
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.logOutAll = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteTokenByClientId(req.user.id)
        res.status(200).send({ message: 'User deconnected' })
    } catch (error) {
        res.status(500).send(error)
    }
}