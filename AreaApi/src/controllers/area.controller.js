const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')

//AreaModel to pass in parameters
async function checkParameters(newArea, res) {
    const reactionParameters = await ReactionModel.findById(newArea.reaction_id)
    if (!reactionParameters) {
        res.status(400).send({ message: "No reaction found with id " + newArea.reaction_id });
        return false
    }

    if (reactionParameters.parameters === null) {
        return true
    }

    const actionParameters = await ActionModel.findById(newArea.action_id)
    if (!actionParameters) {
        res.status(400).send({ message: "No action found with id " + newArea.action_id });
        return false
    }

    if (newArea.parameters === null && reactionParameters.parameters !== null) {
        res.status(400).send({ message: "parameters invalid for reaction" });
        return false
    }

    const newAreaObj = JSON.parse(JSON.stringify(newArea.parameters));
    const reactionObj = reactionParameters.parameters;
    const actionObj = actionParameters.results;

    let resKeys = true 
    Object.keys(reactionObj).forEach(element => {
        console.log("check : ", element)
        if (!newAreaObj.hasOwnProperty(element)) {
            res.status(400).send({ message: "missing parameter " + element });
            resKeys = false
            return;
        }
        // if (typeof (newAreaObj[element]) === "string") {
        //     let resSplit = newAreaObj[element].split("{{")
        //     if (resSplit.length !== 1) {
        //         resSplit = resSplit[1].split("}}")
        //         if (resSplit.length !== 1 && (actionObj === null || !actionObj.hasOwnProperty(resSplit[0]))) {
        //             res.status(401).send({ message: "invalid dynamic parameter " + resSplit[0] });
        //             return false
        //         }

        //     }
        // }
    });

    return resKeys
}

exports.create = async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('action_id'))
            throw new Error('action_id property missing')
        if (!req.body.hasOwnProperty('reaction_id'))
            throw new Error('action_id property missing')
        if (!req.body.hasOwnProperty('parameters'))
            throw new Error('action_id property missing')

        const newArea = new AreaModel({
            client_id: req.user.id,
            action_id: req.body.action_id,
            reaction_id: req.body.reaction_id,
            parameters: req.body.parameters
        });

        const resCheck = await checkParameters(newArea, res)
        if (!resCheck)
            return

        const resRequest = await AreaModel.create(newArea)
        res.status(201).send(resRequest);
    } catch (error) {
        res.status(400).send({message: error.message || 'An error  occured'});
    }
}

exports.getAll = async (req, res) => {
    try {
        const resRequest = await AreaModel.getArea(req.user.id)
        if (!resRequest)
            res.status(200).send([]);
        else
            res.status(200).send(resRequest);
    } catch (error) {
        res.status(400).send({message: error.message || 'An error  occured'});
    }
}

exports.get = async (req, res) => {
    try {
        const resRequest = await AreaModel.findById(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(400).send({message: error.message || 'An error  occured'});
    }
}

exports.delete = async (req, res) => {
    try {
        const resRequest = await AreaModel.delete(req.user.id, req.params.id)
        if (!resRequest)
            throw new Error("No area found")
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(400).send({message: error.message || 'An error  occured'});
    }
}