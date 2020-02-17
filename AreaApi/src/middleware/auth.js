const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()
        req.user = resUser
        req.token = resToken.token
        console.log("Auth : ", req.user, req.token)
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}
module.exports = auth