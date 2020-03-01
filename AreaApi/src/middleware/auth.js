const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

/**
 * Check if the request intercepted is a user authetified
 * 
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 * @param {any} next The next request to validate
 */
const auth = async (req, res, next) => {
    try {
        console.log('trying to connect')
        const token = req.header('Authorization').replace('Bearer ', '').replace('"', '').replace('"', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        console.log(token)

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()
        req.user = resUser
        req.token = resToken.token
        console.log(req.user)
        next()
    } catch (error) {
        console.log('not authorize')
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}
module.exports = auth