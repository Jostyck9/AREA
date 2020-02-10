const express = require('express');
const Services = require('../../models/Service')
const Actions = require('../../models/Action')
const Reactions = require('../../models/Reaction')

const ServiceDetail = require('../../models/ServiceDetail')

const router = express.Router();

/**
 * @typedef Reaction
 * @property {string} name - Parameters's name
 * @property {string} id - Parameters's id
 * @property {string} description - Parameters's description
 * @property {JSON} parameters - Parameters's results format
 */
/**
 * @typedef Action
 * @property {string} name - Action's name
 * @property {string} id - Action's id
 * @property {string} description - Action's description
 * @property {JSON} results - Action's results format
 */
/**
 * @typedef Service
 * @property {string} name - Service's name
 * @property {string} id - Service's id
 * @property {Array.<Action>} actions - Service's actions
 * @property {Array.<Reaction>} reactions - Service's reactions
 */
/**
 * Send a list of available services
 * @route GET /services
 * @group Services - Services informations
 * @returns {Array.<Service>} list of available services
 * @returns {Error}  default - Unexpected error
 */
router.get('/services', async (req, res) => {
    //Get a list of available services
    try {
        resRequest = await ServiceDetail.GetAllServiceDetail()
        res.status(200).send(resRequest)
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Send info about a service
 * @route GET /services/{idService}
 * @group Services - Services informations
 * @param {string} idService.path.require - id of the service
 * @returns {Service.model} Service's informations
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService', async (req, res) => {
    //Get a list of available services
    try {
        resRequest = await ServiceDetail.GetServiceDetailById(req.params.idService)
        res.status(200).send(resRequest)
    } catch {
        res.status(401).send("Service " + req.params.idService + " not found")
        return
    }
})


/**
 * Get actions from a specified service
 * @route GET /services/{idService}/actions
 * @group Services - Services informations
 * @param {string} idService.path.require - id of the service
 * @returns {Array.<Action>} actions of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService/actions', async (req, res) => {
    //Get a list of the service's actions
    service = {}
    try {
        var test = await Services.getById(req.params.idService)
        resRequest = await ServiceDetail.GetActions(req.params.idService)
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Get an action from a specified service
 * @route GET /services/{idService}/actions/{idAction}
 * @group Services - Services informations
 * @param {string} idService.path.require - id of the service
 * @param {string} idAction.path.require - id of the action
 * @returns {Action.model} specified action of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService/actions/:idAction', async (req, res) => {
    //Get a specific action from a speficied service
    try {
        var test = await Services.getById(req.params.idService)
        resRequest = await Actions.getById(req.params.idAction)
        restest = {name: resRequest.name, id: resRequest._id, description: resRequest.description, results: resRequest.res}
        res.status(200).send(restest);
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Get reactions from a specified service
 * @route GET /services/{idService}/reactions
 * @group Services - Services informations
 * @param {string} idService.path.require - id of the service
 * @returns {Array.<Reaction>} reactions of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService/reactions', async (req, res) => {
    //Get a list of the service's actions
    service = {}
    try {
        var test = await Services.getById(req.params.idService)
        resRequest = await ServiceDetail.GetReactions(req.params.idService)
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Get a reaction from a specified service
 * @route GET /services/{idService}/reactions/{idReaction}
 * @group Services - Services informations
 * @param {string} idService.path.require - id of the service
 * @param {string} idReaction.path.require - id of the reaction
 * @returns {Reaction.model} specific reaction of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService/reactions/:idReaction', async (req, res) => {
    //Get a specific action from a speficied service
    try {
        var test = await Services.getById(req.params.idService)
        resRequest = await Reactions.getById(req.params.idReaction)
        restest = {name: resRequest.name, id: resRequest._id, description: resRequest.description, parameters: resRequest.parameters}
        res.status(200).send(restest);
    } catch (error) {
        res.status(401).send(error);
    }
})

module.exports = router;