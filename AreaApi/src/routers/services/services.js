const express = require('express');

const router = express.Router();

/**
 * Send a list of available services
 * @route GET /services
 * @group Services - Services informations
 * @returns {JSON} list of available services
 * @returns {Error}  default - Unexpected error
 */
router.get('/services', async(req, res) => {
    //Get a list of available services
    try { 
        res.status(200).send("List of Services");
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
 * @param {Int} idService.path.require - id of the service
 * @param {Int} idAction.path.require - id of the action
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