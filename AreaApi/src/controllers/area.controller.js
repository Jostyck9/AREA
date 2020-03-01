const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')
const DiscordController = require('./Services/discord.controller')
const TwitterController = require('./Services/twitter.controller')
const GithubController = require('./Services/github.controller')
const DropboxController = require('./Services/dropbox.controller')
const SpotifyController = require('./Services/spotify.controller')
const TimerController = require('./Services/timer.contoller')
const MailController = require('./Services/nodemailer.controller')
const ServiceTokenModel = require('../models/ServiceTokens.model')
const ServiceModel = require('../models/Service.model')

const controllerArray = [
    GithubController, // 0
    TwitterController, // 1
    SpotifyController, // 2
    DiscordController, // 3
    TimerController, // 4
    DropboxController, // 5
    MailController
]

/**
 * Create a reaction according to the request for a specific user
 *
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.create = async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('action_id'))
            throw new Error('action_id property missing')
        if (!req.body.hasOwnProperty('reaction_id'))
            throw new Error('reaction_id property missing')
        if (!req.body.hasOwnProperty('parameters_action'))
            throw new Error('parameters_action property missing')
        if (!req.body.hasOwnProperty('parameters_reaction'))
            throw new Error('parameters_reaction property missing')

        const newArea = new AreaModel({
            client_id: req.user.id,
            action_id: req.body.action_id,
            reaction_id: req.body.reaction_id,
            parameters_action: req.body.parameters_action,
            parameters_reaction: req.body.parameters_reaction
        });
        const resConnect = await checkServiceConnection(newArea, req.user.id, res)
        if (!resConnect)
            return
        const resCheck = await checkParameters(newArea, res)
        if (!resCheck)
            return
        const resRequest = await AreaModel.create(newArea)
        await SendCreatedToService(resRequest)
        res.status(201).send({ message: 'area created' });
    } catch (error) {
        res.status(400).send({ message: error.message || 'An error  occured' });
    }
}

/**
 * Get all the user's area
 *
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.getAll = async (req, res) => {
    try {
        const resRequest = await AreaModel.getArea(req.user.id)
        if (!resRequest)
            res.status(200).send([]);
        else
            res.status(200).send(resRequest);
    } catch (error) {
        res.status(404).send({ message: error.message || 'An error  occured' });
    }
}

/**
 * Get a specific user's area by his id
 *
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.get = async (req, res) => {
    try {
        const resRequest = await AreaModel.findById(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(404).send({ message: error.message || 'An error  occured' });
    }
}

/**
 * Delete a specific user's area from id
 *
 * @async
 * @param {Request<ParamsDictionary, any, any>} req The request received with the route
 * @param {Response<any>} res The result of the request to send after
 */
exports.delete = async (req, res) => {
    try {
        const resArea = await AreaModel.findById(req.user.id, req.params.id)
        if (!resArea)
            throw new Error("No area found")

        const resRequest = await AreaModel.delete(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        await SendDeletedToService(resArea)
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(404).send({ message: error.message || 'An error  occured' });
    }
}


// NOTE <<<<<<<<<<<<<<<<<<<<<<<<<< A deplacer dans les services

/**
 * Connect an action to its reaction
 * 
 * @async
 * @group area.controller - connectActionToReaction
 * @param {Int} action_id - id of the action that was detected
 * @param {JSON} action_result - json that contains results of the action (username, message content, ....)
 * @returns {Error}  default - Unexpected error
 */

// NOTE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/**
 * Call a specific serviceController depending on the reaction_id
 *
 * @param {AreaModel} area - AreaModel that contains datas about the current Area
 * @param {Int} action_id - id of the action that was detected
 * @param {JSON} action_result - json that contains results of the action (username, message content, ....)
 */
exports.SendToReactionById = async (area, action_id, action_result) => {
    // Call a specific serviceController depending on the reaction_id
    try {
        area.parameters_reaction = setDynamicParamters(action_result, area.parameters_reaction)
        const reactionmodel = await ReactionModel.findById(area.reaction_id); // NOTE controllerArray is global
        await controllerArray[reactionmodel.service_id].useReaction(action_result, area);
    } catch (err) {
        console.error(err.message)
    }
}

/**
 * Replace all dynamic paramters of form {{variable}} by his correspondance from actionResult
 * 
 * @param {JSON} actionResult - To set in parameters
 * @param {JSON} reactionParameters - To modified
 * @returns {JSON} - the reactionParameters modified
 */
function setDynamicParamters(actionResult, reactionParameters) {
    if (actionResult && reactionParameters) {
        Object.keys(reactionParameters).forEach(element_reaction => {
            Object.keys(actionResult).forEach(element_action => {
                let tampon = "{{" + element_action + "}}"
                while (reactionParameters[element_reaction].includes(tampon)) {
                    reactionParameters[element_reaction] = reactionParameters[element_reaction].replace("{{" + element_action + "}}", actionResult[element_action])
                }
            });
        });
    }
    return reactionParameters
}

/**
 * Send the area to the appropriate service for initialisation
 *
 * @param {JSON} newArea
 */
async function SendCreatedToService(newArea) {
    try {
        const reqService = await ActionModel.findById(newArea.action_id)
        console.log(reqService)
        if (reqService) {
            controllerArray[reqService.service_id].createArea(newArea)
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * Send the deleted area to the appropriate service to delete by their side
 *
 * @param {JSON} areaToDelete
 */
async function SendDeletedToService(areaToDelete) {
    try {
        const reqService = await ActionModel.findById(areaToDelete.action_id)
        if (reqService) {
            controllerArray[reqService.service_id].deleteArea(areaToDelete)
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * Check if the user is connected to the services for the area
 * 
 * @async 
 * @param {JSON} newArea 
 * @param {number} client_id 
 * @param {Response<any>} res The result of the request to send after
 * @returns {boolean} is the request is valid or not
 */
async function checkServiceConnection(newArea, client_id, res) {
    const reactionParameters = await ReactionModel.findById(newArea.reaction_id)
    if (!reactionParameters) {
        res.status(400).send({ message: "No reaction found with id " + newArea.reaction_id });
        return false
    }
    const actionParameters = await ActionModel.findById(newArea.action_id)
    if (!actionParameters) {
        res.status(400).send({ message: "No action found with id " + newArea.action_id });
        return false
    }

    var resService = await ServiceModel.findById(actionParameters.service_id)
    if (resService.oauth) {
        const tokenAction = await ServiceTokenModel.findByServiceAndClientId(actionParameters.service_id, client_id)
        if (!tokenAction) {
            res.status(400).send({ message: "You have to connect you account for service: '" + resService.name + "'" });
            return false
        }
    }

    var resService = await ServiceModel.findById(reactionParameters.service_id)
    if (resService.oauth) {
        const tokenReaction = await ServiceTokenModel.findByServiceAndClientId(reactionParameters.service_id, client_id)
        if (!tokenReaction) {
            const resService = await ServiceModel.findById(reactionParameters.service_id)
            res.status(400).send({ message: "You have to connect you account for service: '" + resService.name + "'" });
            return false
        }
    }
    return true
}

/**
 * Check if the field parameter inside the res.body is good according the action and the reaction
 *
 * @async
 * @param {AreaModel} newArea The request received with the route
 * @param {Response<any>} res The result of the request to send after
 * @returns {boolean} if the request is valid or not
 */
async function checkParameters(newArea, res) {
    const reactionParameters = await ReactionModel.findById(newArea.reaction_id)
    if (!reactionParameters) {
        res.status(400).send({ message: "No reaction found with id " + newArea.reaction_id });
        return false
    }
    const actionParameters = await ActionModel.findById(newArea.action_id)
    if (!actionParameters) {
        res.status(400).send({ message: "No action found with id " + newArea.action_id });
        return false
    }

    //if no parameters are necessaries
    if (reactionParameters.parameters === null && actionParameters.parameters === null) {
        return true
    }

    if (newArea.parameters_action === null && (actionParameters.parameters !== null && Object.keys(actionParameters.parameters).length !== 0)) {
        res.status(400).send({ message: "parameters invalid for action" });
        return false
    }

    if (newArea.parameters_reaction === null && (reactionParameters.parameters !== null && Object.keys(reactionParameters.parameters).length !== 0)) {
        res.status(400).send({ message: "parameters invalid for reaction" });
        return false
    }

    const areaReactionParam = JSON.parse(JSON.stringify(newArea.parameters_reaction));
    const areaActionParam = JSON.parse(JSON.stringify(newArea.parameters_action));
    const reactionObj = reactionParameters.parameters;
    const actionObj = actionParameters.parameters;

    let resKeys = true
    if (actionObj) {
        Object.keys(actionObj).forEach(element => {
            if (!areaActionParam.hasOwnProperty(element)) {
                res.status(400).send({ message: "missing parameter " + element + " for action" });
                resKeys = false
                return;
            }
        });
    }
    if (!resKeys)
        return (false)

    if (reactionObj) {
        Object.keys(reactionObj).forEach(element => {
            if (!areaReactionParam.hasOwnProperty(element)) {
                res.status(400).send({ message: "missing parameter " + element + " for reaction" });
                resKeys = false
                return;
            }
        });
    }

    return resKeys
}