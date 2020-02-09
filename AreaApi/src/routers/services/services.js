const express = require('express');
const Services = require('../../models/Service')
const Actions = require('../../models/Action')

const router = express.Router();

/**
 * @typedef Service
 * @property {integer} id - Service's id
 * @property {string} name - Service's name
 */
/**
 * Send a list of available services
 * @route GET /services
 * @group Services - Services informations
 * @returns {Array.<Service>} list of available services
 * @returns {Error}  default - Unexpected error
 */
router.get('/services', async(req, res) => {
    //Get a list of available services
    try {
        const service = await Services.getAll()
        const resRequest = []
        service.forEach(element => {
            resRequest.push({id: element._id, name: element.name})
        });
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
router.get('/services/:idService', async(req, res) => {
    //Get a list of available services
    try {
        const service = await Services.getById(req.params.idService)
        const resRequest = {id: service._id, name: service.name}
        res.status(200).send(resRequest)
    } catch (error) {
        res.status(401).send(error);
    }
})


/**
 * Send a actions from a specified service
 * @route GET /services/{idService}/actions
 * @group Services - Services informations
 * @param {Int} idService.path.require - id of the service
 * @returns {JSON} actions of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService/actions', async(req, res) => {
    //Get a list of the service's actions
    try { 
        res.status(200).send("List of Service's actions for : " + req.params.idService);
    } catch (error) {
        res.status(401).send(error);
    }
})

/**
 * Send a actions from a specified service
 * @route GET /services/{idService}/actions/{idAction}
 * @group Services - Services informations
 * @param {string} idService.path.require - id of the service
 * @param {string} idAction.path.require - id of the action
 * @returns {JSON} specified action of the specified service
 * @returns {Error}  default - Unexpected error
 */
router.get('/services/:idService/actions/:idAction', async(req, res) => {
    //Get a specific action from a speficied service
    try { 
        res.status(200).send("Specific Action from Specific Service");
    } catch (error) {
        res.status(401).send(error);
    }
})
module.exports = router;