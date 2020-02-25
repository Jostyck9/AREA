const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

const auth = async (req, res, next) => {
    try {
        console.log('try to connect')
        // req.session.socketId = req.query.socketId
        // req.session.token = req.query.token
        // next()
        const token = req.query.token
        const data = jwt.verify(token, process.env.JWT_KEY)

        const resToken = await Token.findByClientToken(token)
        if (!resToken)
            throw new Error()

        const resUser = await User.findById(resToken.client_id)
        if (!resUser)
            throw new Error()
        req.session.token = req.query.token
        // req.user = resUser
        next()
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' })
    }
}

module.exports = auth