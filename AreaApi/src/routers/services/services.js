const express = require('express');
const Services = require('../../models/Service')
// const Actions = require('../../models/Action')
// const Reactions = require('../../models/Reaction')

// const ServiceDetail = require('../../models/ServiceDetail')

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
    // //Get a list of available services
    // try {
    //     resRequest = await ServiceDetail.GetAllServiceDetail()
    //     res.status(200).send(resRequest)
    // } catch (error) {
    //     res.status(401).send(error);
    // }
    try {
        const resRequest = await Services.getAll()
        console.log('Succes', resRequest, 'end')
        res.status(200).send(JSON.stringify(resRequest))
    } catch (err) {
        console.log('Err', err)
        res.status(400).send(err)
    }
})

/**
 * Send info about a service
 * @route GET /services/{nameService}
 * @group Services - Services informations
 * @param {string} nameService.path.require - id of the service
 * @returns {Service.model} Service's informations
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:nameService', async (req, res) => {
    //Get a list of available services
    // try {
    //     resRequest = await ServiceDetail.GetServiceDetailByName(req.params.nameService)
    //     res.status(200).send(resRequest)
    // } catch {
    //     res.status(401).send("Service " + req.params.idService + " not found")
    //     return
    // }
    res.status(200).send('ok')
})


/**
 * Get actions from a specified service
 * @route GET /services/{nameService}/actions
 * @group Services - Services informations
 * @param {string} nameService.path.require - id of the service
 * @returns {Array.<Action>} actions of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:nameService/actions', async (req, res) => {
    //Get a list of the service's actions
    // service = {}
    // try {
    //     var test = await Services.getByName(req.params.nameService)
    //     resRequest = await ServiceDetail.GetActions(test._id)
    //     res.status(200).send(resRequest);
    // } catch (error) {
    //     res.status(401).send(error);
    // }
    res.status(200).send('ok')
})

/**
 * Get an action from a specified service
 * @route GET /services/{nameService}/actions/{nameAction}
 * @group Services - Services informations
 * @param {string} nameService.path.require - id of the service
 * @param {string} nameAction.path.require - id of the action
 * @returns {Action.model} specified action of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:nameService/actions/:nameAction', async (req, res) => {
    //Get a specific action from a speficied service
    // try {
    //     var test = await Services.getByName(req.params.nameService)
    //     resRequest = await Actions.getByName(req.params.nameAction)
    //     restest = {name: resRequest.name, id: resRequest._id, description: resRequest.description, results: resRequest.res}
    //     res.status(200).send(restest);
    // } catch (error) {
    //     res.status(401).send(error);
    // }
    res.status(200).send('ok')
})

/**
 * Get reactions from a specified service
 * @route GET /services/{nameService}/reactions
 * @group Services - Services informations
 * @param {string} nameService.path.require - id of the service
 * @returns {Array.<Reaction>} reactions of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:nameService/reactions', async (req, res) => {
    // //Get a list of the service's actions
    // service = {}
    // try {
    //     var test = await Services.getByName(req.params.nameService)
    //     resRequest = await ServiceDetail.GetReactions(test._id)
    //     res.status(200).send(resRequest);
    // } catch (error) {
    //     res.status(401).send(error);
    // }
    res.status(200).send('ok')
})

/**
 * Get a reaction from a specified service
 * @route GET /services/{nameService}/reactions/{nameReaction}
 * @group Services - Services informations
 * @param {string} nameService.path.require - id of the service
 * @param {string} nameReaction.path.require - id of the reaction
 * @returns {Reaction.model} specific reaction of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:nameService/reactions/:nameReaction', async (req, res) => {
    //Get a specific action from a speficied service
    // try {
    //     var test = await Services.getByName(req.params.nameService)
    //     resRequest = await Reactions.getByName(req.params.nameReaction)
    //     restest = {name: resRequest.name, id: resRequest._id, description: resRequest.description, parameters: resRequest.parameters}
    //     res.status(200).send(restest);
    // } catch (error) {
    //     res.status(401).send(error);
    // }
    res.status(200).send('ok')
})

module.exports = router;