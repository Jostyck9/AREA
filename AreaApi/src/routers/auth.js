const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/User')

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
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ token })
    } catch (error) {
        res.status(400).send(error)
    }
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
router.post('/auth/login', async(req, res) => {
    //Login a registered user
    try {
        console.log("login")
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            console.log('failed auth')
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ token })
    } catch (error) {
        res.status(401).send({ error: 'Not authorized ! Check authentication credentials' })
    }

})

// router.get('/users/me', auth, async(req, res) => {
//     // View logged in user profile
//     res.send(req.user)
// })

// router.post('/users/me/logout', auth, async (req, res) => {
//     // Log user out of the application
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.post('/users/me/logoutall', auth, async(req, res) => {
//     // Log user out of all devices
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

module.exports = router