const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')
const ServiceModel = require('../models/Service.model')
const DiscordController = require('./discord.controller')
const TwitterController = require('./twitter.controller')
const GithubController = require('./github.controller')
const DropboxController = require('./dropbox.controller')
const SpotifyController = require('./spotify.controller')
const TimerController = require('./timer.contoller')
const MailController = require('./nodemailer.controller')

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
 * Check if the field parameter inside the res.body is good according the action and the reaction
 *
 * @param {AreaModel} newArea The request received with the route
 * @param {Response<any>} res The result of the request to send after
 * @returns {boolean} is the request is valid or not
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

/**
 * Create a reaction according to the request for a specific user
 *
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
        res.status(400).send({ message: error.message || 'An error  occured' });
    }
}

/**
 * Get a specific user's area by his id
 *
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
        res.status(400).send({ message: error.message || 'An error  occured' });
    }
}

/**
 * Delete a specific user's area from id
 *
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
        res.status(400).send({ message: error.message || 'An error  occured' });
    }
}


// NOTE <<<<<<<<<<<<<<<<<<<<<<<<<< A deplacer dans les services

/**
 * Connect an action to its reaction
 * @group area.controller - connectActionToReaction
 * @param {Int} action_id - id of the action that was detected
 * @param {JSON} action_result - json that contains results of the action (username, message content, ....)
 * @returns {Error}  default - Unexpected error
 */
exports.connectActionToReaction = async (action_id, action_result) => {
    //is called by a service.controller that detected an action and Connect an action to its reaction
    try {
        const AreaArray = await AreaModel.findByActionId(action_id);
        AreaArray.forEach(element => {
            if (checkIfuserIsConcerned(element, action_result, action_id)) {
                SendToReactionById(element, action_id, action_result);
            }
        });

    }
    catch (error) {

    }
}

function checkIfuserIsConcerned(area, action_result, action_id) {

    // TODO faire une fonction par service pour vider la chose car c'est trop le bordel
    const actionArray = [
        GithubController.githubPush, // 0
        GithubController.githubNewPullRequest, // 1
        TwitterController.twitterTweet, // 2
        SpotifyController.spotifyNewMusic, // 3
        DiscordController.discordMessageReceived, // 4
        DiscordController.discordNewMember, // 5
        DiscordController.discordMemberBan, // 6
        DiscordController.discordNewMember, // 7 TODO change Timer
        DropboxController.dropboxFileAdded, // 8
        DropboxController.dropboxFileDeleted // 9
    ]
    return actionArray[action_id](area, action_result);
}

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
        // NOTE set dynamic parameters
        if (action_result && area.parameters_reaction) {
            Object.keys(area.parameters_reaction).forEach(element_reaction => {
                Object.keys(action_result).forEach(element_action => {
                    let tampon = "{{" + element_action + "}}"
                    while (area.parameters_reaction[element_reaction].includes(tampon)) {
                        area.parameters_reaction[element_reaction] = area.parameters_reaction[element_reaction].replace("{{" + element_action + "}}", action_result[element_action])
                    }
                });
            });
        }

        const reactionmodel = await ReactionModel.findById(area.reaction_id); // NOTE controllerArray is global
        await controllerArray[reactionmodel.service_id].useReaction(action_result, area);
    } catch (err) {
        console.error(err.message)
    }
}

/**
 * Send the area to the appropriate service for initialisation
 * 
 * @param {JSON} newArea 
 */
async function SendCreatedToService(newArea) {
    try {
        // TODO refrecator
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
