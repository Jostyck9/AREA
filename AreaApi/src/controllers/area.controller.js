const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')
const DiscordController = require('../controllers/discord.controller')

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

    if (newArea.parameters_action === null && reactionParameters.parameters !== null) {
        res.status(400).send({ message: "parameters invalid for action" });
        return false
    }

    if (newArea.parameters_reaction === null && reactionParameters.parameters !== null) {
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
 * Connect an action to its reaction
 * @group area.controller - connectActionToReaction
 * @param {Int} action_id - id of the action that was detected
 * @param {JSON} action_result - json that contains results of the action (username, message content, ....)
 * @returns {Error}  default - Unexpected error
 */
exports.connectActionToReaction =  async (action_id, action_result) => {
    //is called by a service.controller that detected an action and Connect an action to its reaction
    try {
        const newArea = new AreaModel();
        const AreaArray= newArea.findByActionId(action_id);
        AreaArray.forEach(element => {
            SendToReactionById(element.reaction_id, action_id, action_result);
        });

    }
    catch (error) {

    }
    // check if the user is concerned --> check if area.params_actions matches result
    // (ex: area.param_action contient "etre notifié des tweets de Gabin" donc si result username correspond pas à Gabin on retient pas cette AREA)

    //foreach des area qui restent et on appelle Area.reaction_id.service_id.userReaction(client_id, action_result, reaction_id) --> petite incohérence pq pas appeler la réaction tout desuite ?
}

async function SendToReactionById(reaction_id, action_id, action_result) {
    // set off the corresponding reaction
    const ReactionModel = new ReactionModel();
    const Reaction = ReactionModel.findById(reaction_id);
    console.info("the service id of the reaction is : " + Reaction.service_id);
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
        res.status(201).send(resRequest);
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
        const resRequest = await AreaModel.delete(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(400).send({ message: error.message || 'An error  occured' });
    }
}