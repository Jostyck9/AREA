const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Tokens')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const token = await Token.findByClientToken(data)
        if (!user) {
            throw new Error()
        }
        req.user = await User.findById(token.id)
        req.token = token.token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
    next()

}
module.exports = auth