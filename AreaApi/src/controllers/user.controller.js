const UserModel = require('../models/User.model')

/**
 * Get the auth user information
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getMe = async (req, res) => {
    try {
        if (req.user.is_oauth2)
            res.status(200).send({username: req.user.username, is_oauth2: req.user.is_oauth2})
        else
            res.status(200).send({username: req.user.username, email: req.user.email})
    } catch (error) {
        res.status(403).send({message: error.message || "Some error occurred while getting the User."})
    }
}

/**
 * Update username
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.updateUsername = async (req, res) => {
    try {
        if (!req.body.hasOwnProperty("username"))
            throw new Error('Field username missing')
        const resRequest = await UserModel.updateUsername(req.user.id, req.body.username)
        res.status(200).send(resRequest)
    } catch (error) {
        res.status(403).send({message: error.message || "Some error occurred while getting the User."})
    }
}

/**
 * Get username
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getUsername = async (req, res) => {
    try {
        res.status(200).send({username: req.user.username})
    } catch (error) {
        res.status(403).send({message: error.message || "Some error occurred while getting the User."})
    }
}

/**
 * Update password
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.updatePassword = async (req, res) => {
    try {
        if (req.user.is_oauth2)
            throw new Error('Cannot update password because you authentified by oauth2')
        if (!req.body.hasOwnProperty("password"))
            throw new Error('Field password missing')
        const resRequest = await UserModel.updatePassword(req.user.id, req.body.password)
        res.status(200).send(resRequest)
    } catch (error) {
        res.status(403).send({message: error.message || "Some error occurred while getting the User."})
    }
}