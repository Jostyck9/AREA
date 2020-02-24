const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')
const DiscordController = require('../controllers/discord.controller')

//AreaModel to pass in parameters
async function checkParameters(newArea, res) {
    const reactionParameters = await ReactionModel.findById(newArea.reaction_id)
    if (!reactionParameters) {
        res.status(401).send({ message: "No reaction found with id " + newArea.reaction_id });
        return false
    }

    if (reactionParameters.parameters === null) {
        return true
    }

    const actionParameters = await ActionModel.findById(newArea.action_id)
    if (!actionParameters) {
        res.status(401).send({ message: "No action found with id " + newArea.action_id });
        return false
    }

    if (newArea.parameters === null && reactionParameters.parameters !== null) {
        res.status(401).send({ message: "parameters invalid for reaction" });
        return false
    }

    const newAreaObj = JSON.parse(JSON.stringify(newArea.parameters));
    const reactionObj = reactionParameters.parameters;
    const actionObj = actionParameters.results;

    Object.keys(reactionObj).forEach(element => {
        if (!newAreaObj.hasOwnProperty(element)) {
            res.status(401).send({ message: "missing parameter " + element });
            return false
        }
        if (typeof (newAreaObj[element]) === "string") {
            let resSplit = newAreaObj[element].split("{{")
            if (resSplit.length !== 1) {
                resSplit = resSplit[1].split("}}")
                if (resSplit.length !== 1 && (actionObj === null || !actionObj.hasOwnProperty(resSplit[0]))) {
                    res.status(401).send({ message: "invalid dynamic parameter " + resSplit[0] });
                    return false
                }

            }
        }
    });

    return true
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


exports.create = async (req, res) => {
    try {
        const newArea = new AreaModel({
            client_id: req.user.id,
            action_id: req.body.action_id,
            reaction_id: req.body.reaction_id,
            parameters: req.body.parameters
        });


        // TODO Parser les paramètres en fonctions des actions et voir s'ils sont tous remplis
        if (!await checkParameters(newArea, res)) {
            return
        }

        const resRequest = await AreaModel.create(newArea)
        console.log(resRequest)
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const resRequest = await AreaModel.getArea(req.user.id)
        if (!resRequest)
            res.status(200).send("[]");
        else
            res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send(error.message);
    }
}

exports.get = async (req, res) => {
    try {
        const resRequest = await AreaModel.findById(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send(error.message);
    }
}

exports.delete = async (req, res) => {
    try {
        const resRequest = await AreaModel.delete(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send(error.message);
    }
}