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

        await User.create(user, async (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                })
            } else {
                if (!data) {
                    res.status(401).send('not authorized')
                } else {
                    await Token.create(data.id, (errToken, resToken) => {
                        if (errToken) {
                            res.status(500).send({
                                message: errToken.message || "Some error occurred while creating the User."
                            })
                        } else {
                            res.status(200).send(resToken)
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.login = async (req, res) => {
    //Login a registered user
    console.log("User trying to connect")
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        // Create a Customer
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        await User.findByCredentials(user.email, user.password, async (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                })
            } else {
                if (!data) {
                    res.status(401).send('not authorized')
                } else {
                    await Token.create(data.id, (errToken, resToken) => {
                        if (errToken) {
                            res.status(500).send({
                                message: errToken.message || "Some error occurred while creating the User."
                            })
                        } else {
                            res.status(200).send(resToken)
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.logOut = async (req, res) => {
    // Log user out of the application
    try {
        await Token.deleteToken(req.token, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while loging out the User."
                })
                return
            }
            res.status(200).send({message: 'User deconnected'})
        })
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.logOutAll = async (req, res) => {

}