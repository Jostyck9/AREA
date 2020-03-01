const ServiceDetail = require('../models/ServiceDetail.model')
const Service = require('../models/Service.model')
const Action = require('../models/Action.model')
const Reaction = require('../models/Reaction.model')

/**
 * Get all the availables services
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getAllServices = async (req, res) => {
    try {
        const resRequest = await ServiceDetail.GetAllServiceDetail();
        if (!resRequest) {
            res.status(200).send({})
            return
        }
        res.status(200).send(resRequest)
    } catch (err) {
        // console.log('message: ', err.message)
        res.status(400).send({message: err.message || 'An internal error occured'})
    }
};

/**
 * Get a specific service
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getService = async (req, res) => {
    try {
        const resRequest = await ServiceDetail.GetServiceDetailByName(req.params.nameService);
        if (!resRequest) {
            res.status(404).send({message: 'Unknow service'})
            return
        }
        res.status(200).send(resRequest)
    } catch (err) {
        // console.log('message: ', err.message)
        res.status(400).send({message: err.message || 'An internal error occured'})
    }
}

/**
 * Get all the actions from a specific service
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getServiceAllActions = async (req, res) => {
    try {
        const service = await Service.findByName(req.params.nameService)
        if (!service) {
            res.status(404).send({message: 'Unknow service'})
            return
        }
        const resRequest = await ServiceDetail.GetActions(service.id);
        if (!resRequest) {
            res.status(200).send({})
            return
        }
        res.status(200).send(resRequest)
    } catch (err) {
        res.status(400).send({message: err.message || 'An internal error occured'})
    }
}

/**
 * Get a specific action from a specific service
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getServiceAction = async (req, res) => {
    try {
        var service = await Service.findByName(req.params.nameService)
        if (!service) {
            res.status(404).send({message: 'Unknow service'})
            return
        }
        resRequest = await Action.findByName(req.params.nameAction)
        if (!resRequest) {
            res.status(404).send({message: 'Unknow action'})
            return
        }
        res.status(200).send({name: resRequest.name, id: resRequest.id, description: resRequest.description, results: resRequest.results});
    } catch (error) {
        res.status(400).send({message: error.message || 'An internal error occured'});
    }
}

/**
 * Get all the reactions from a specific service
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getServiceAllReactions = async (req, res) => {
    try {
        var service = await Service.findByName(req.params.nameService)
        if (!service) {
            res.status(404).send({message: 'Unknow service'})
            return
        }
        const resRequest = await ServiceDetail.GetReactions(service.id);
        if (!resRequest) {
            res.status(200).send({})
            return
        }
        res.status(200).send(resRequest)
    } catch (error) {
        res.status(400).send({message: error.message || 'An internal error occured'});
    }
}

/**
 * Get all the reactions from a specifi reaction
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getServiceReaction = async (req, res) => {
    try {
        var service = await Service.findByName(req.params.nameService)
        if (!service) {
            res.status(404).send({message: 'Unknow service'})
            return
        }
        resRequest = await Reaction.findByName(req.params.nameReaction)
        if (!resRequest) {
            res.status(404).send({message: 'Unknow reaction'})
            return
        }
        res.status(200).send({name: resRequest.name, id: resRequest.id, description: resRequest.description, parameters: resRequest.parameters});
    } catch (error) {
        res.status(400).send({message: error.message || 'An internal error occured'});
    }
}

/**
 * Get a specific action by id
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getAction = async (req, res) => {
    try {
        resRequest = await Action.findById(req.params.idAction)
        if (!resRequest) {
            res.status(404).send({message: 'Unknow action'})
            return
        }
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(400).send({message: error.message || 'An internal error occured'});
    }
}

/**
 * Get a specific reaction by id
 * 
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getReaction = async (req, res) => {
    try {
        resRequest = await Reaction.findById(req.params.idReaction)
        if (!resRequest) {
            res.status(404).send({message: 'Unknow reaction'})
            return
        }
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(400).send({message: error.message || 'An internal error occured'});
    }
}