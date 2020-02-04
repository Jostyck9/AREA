const express = require('express');
const User = require('../models/User');

const router = express.Router();

/**
 * @typedef RegisterOAuth2Data
 * @property {int} service.required - The service id to retrieve with the /services route
 * @property {string} accessToken.required - user's access token
 * @property {string} refreshToken.required - user's refresh token.
 */

/**
 * Register or log the user inside the db with a service token
 * @route POST /auth2/login
 * @group User - User Registration with OAuth2
 * @param {RegisterOAuth2Data.model} register.body.required - The user informations
 * @returns {JSON} 200 - JWT for the api
 * @returns {Error}  default - Unexpected error
 */
router.post('/auth2/login', async (req, res) => {
    // log with OAuth2
    var oauth = "connect with id : " + req.body.service;
    console.log("User trying to create");
    res.status(200).send({ oauth })
})

module.exports = router