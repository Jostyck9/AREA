const UserModel = require('../models/User.model')
const Service = require('../models/Service.model')
const AuthService = require('../models/ServiceTokens.model')

/**
 * Get the auth user information
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getMe = async (req, res) => {
    try {
        if (req.user.is_oauth2)
            res.status(200).send({ username: req.user.username, is_oauth2: req.user.is_oauth2 })
        else
            res.status(200).send({ username: req.user.username, email: req.user.email, is_oauth2: req.user.is_oauth2 })
    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occurred while getting the User." })
    }
}

/**
 * Update username
 * 
 * @async
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
        res.status(403).send({ message: error.message || "Some error occurred while getting the User." })
    }
}

/**
 * Get username
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getUsername = async (req, res) => {
    try {
        res.status(200).send({ username: req.user.username })
    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occurred while getting the User." })
    }
}

/**
 * Update password
 * 
 * @async
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
        res.status(403).send({ message: error.message || "Some error occurred while getting the User." })
    }
}

/**
 * Get Authenticate service status, returns if the user is connected
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getAuthServiceStatus = async (req, res) => {
    try {
        let isConnected = true;
        if (!req.params.hasOwnProperty("nameService")) {
            throw new Error('Missing nameService parameter')
        }
        const service = await Service.findByName(req.params.nameService)
        if (!service) {
            res.status(404).send({ message: 'Unknow service' })
            return
        }
        if (service.oauth) {
            const resAuth = await AuthService.findByServiceAndClientId(service.id, req.user.id)
            if (!resAuth) {
                isConnected = false;
            }
        }
        res.status(200).send({ name: service.name, isConnected: isConnected })

    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occured while getting the status." })
    }
}

/**
 * Get all the Authenticate service status, returns if the user is connected
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getAllAuthServiceStatus = async (req, res) => {
    try {
        let resRequest = []
        const service = await Service.getAll()
        if (!service) {
            res.status(200).send([])
            return
        }
        for (const element of service) {
            let isConnected = true
            if (element.oauth) {
                const resAuth = await AuthService.findByServiceAndClientId(element.id, req.user.id)
                if (!resAuth) {
                    isConnected = false;
                }
            }
            resRequest.push({ name: element.name, isConnected: isConnected })
        }
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occured while getting the status." })
    }
}