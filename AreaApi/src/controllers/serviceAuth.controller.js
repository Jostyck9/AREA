const ServiceAuthModel = require('../models/ServiceTokens.model')
const User = require('../models/User.model')
const Token = require('../models/Tokens.model')

exports.connect = async (user_id, serviceTokens, serviceId, res) => {
    try {
        const foundService = await ServiceAuthModel.findByServiceAndClientId(serviceId, user_id);
        if (foundService) {
            await ServiceAuthModel.remove(foundService[0].id)
        }
        const toSave = new ServiceAuthModel({
            client_id: user_id,
            service_id: serviceId,
            access_token: serviceTokens.access_token || null,
            refresh_token: serviceTokens.refresh_token || null,
            secret_token: serviceTokens.secret_token || null,
            expires_in: serviceTokens.expires_in || null
        })
        const resRequest = await ServiceAuthModel.create(toSave)
        if (res)
            res.status(200).send({ message: 'connected' })
    } catch (err) {
        if (res)
            res.status(403).send({ message: err.message || "An error occured" })
        else
            throw err
    }
}

exports.loginGithub = async (req, res) => {
    try {
        // Create a Customer
        const user = new User({
            email: req.user.profile.id,
            username: req.user.profile.login,
            password: 'LoginOAuth2'
        });

        const resUser = await User.create(user)
        if (!resUser) {
            res.status(401).send('not authorized')
        } else {
            const resToken = await Token.create(resUser.id)
            if (resToken)
                res.status(201).send(resToken)
            else
                res.status(500).send({ message: "Some error occurred while creating the User." })
        }

    } catch (error) {
        res.status(403).send({ message: error.message || "Some error occurred while creating the User." })
    }
}