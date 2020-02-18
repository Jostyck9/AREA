const AreaModel = require('../models/Area.model') 

exports.create = async (req, res) => {
    try { 
        const newArea = new AreaModel({
            client_id: req.user.id,
            action_id: req.body.action_id,
            reaction_id: req.body.reaction_id,
            parameters: req.body.parameters
        });
        const resRequest = await AreaModel.create(newArea)
        console.log(resRequest)
        res.status(200).send(resRequest);
    } catch (error) {
        res.status(401).send(error);
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