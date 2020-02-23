const ServiceDetail = require('../models/ServiceDetail.model')
const Service = require('../models/Service.model')
const Action = require('../models/Action.model')
const Reaction = require('../models/Reaction.model')

exports.getAllServices = async (req, res) => {
    try {
        const resRequest = await ServiceDetail.GetAllServiceDetail();
        if (!resRequest) {
            res.status(200).send({})
            return
        }
        res.status(200).send(resRequest)
    } catch (err) {
        console.log('message: ', err.message)
        res.status(400).send({message: err.message || 'An internal error occured'})
    }
};

exports.getService = async (req, res) => {
    try {
        const resRequest = await ServiceDetail.GetServiceDetailByName(req.params.nameService);
        if (!resRequest) {
            res.status(404).send({message: 'Unknow service'})
            return
        }
        res.status(200).send(resRequest)
    } catch (err) {
        console.log('message: ', err.message)
        res.status(400).send({message: err.message || 'An internal error occured'})
    }
}

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
        res.status(400).send({message: err.message || 'An internal error occured'});
    }
}

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
        res.status(400).send({message: err.message || 'An internal error occured'});
    }
}

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
        res.status(400).send({message: err.message || 'An internal error occured'});
    }
}