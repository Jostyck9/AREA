const express = require('express')
// const auth = require('../middleware/auth')
const User = require('../models/User')
// const Token = require('../models/Token')

const router = express.Router()

/**
 * @typedef RegisterData
 * @property {string} name.required - user's name
 * @property {string} email.required - user's email
 * @property {string} password.required - user's password.
 */

/**
 * Register the user inside the db
 * @route POST /auth/register
 * @group User - User Registration
 * @param {RegisterData.model} register.body.required - The user informations
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/register', async (req, res) => {
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

        await User.create(user, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                })
            } else {
                if (!data) {
                    res.status(401).send('not authorized')
                } else {
                    res.status(200).send(data)
                }
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
    // res.status(200).send('ok')
})

/**
 * @typedef LoginData
 * @property {string} email.required - user's email
 * @property {string} password.required - user's password.
 */

/**
 * Log the user
 * @route POST /auth/login
 * @group User - User Login
 * @param {LoginData.model} login.body.required - The user informations
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth/login', async (req, res) => {
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

        await User.findByCredentials(user.email, user.password, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                })
            } else {
                if (!data) {
                    res.status(401).send('not authorized')
                } else {
                    res.status(200).send(data)
                }
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/auth/logout', async (req, res) => {
    // Log user out of the application
    // try {
    //     req.user.tokens = req.user.tokens.filter((token) => {
    //         return token.token != req.token
    //     })
    //     await req.user.save()
    //     res.send()
    // } catch (error) {
    //     res.status(500).send(error)
    // }
    res.status(200).send('ok')
})

module.exports = router