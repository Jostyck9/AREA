const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

const auth = async(req, res, next) => {
    try {
        var errorAppend = false;
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        await Token.findByClientToken(token, async (errRequest, resRequest) => {
            if (errRequest || !resRequest) {
                errorAppend = true
            } else {
                await User.findById(resRequest.client_id, (errRequest, resRequest2) => {
                    if (errRequest) {
                        errorAppend = true
                    } else {
                        req.user = resRequest2
                        req.token = resRequest.token
                        console.log("Auth : ", req.user, req.token)
                        next()
                    }
                })
            }
        })
        if (errorAppend)
            throw new Error()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}
module.exports = auth