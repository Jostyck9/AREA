const ServiceDetail = require('../models/ServiceDetail.model')
const Service = require('../models/Service.model')

exports.getAllServices = async (req, res) => {
    try {
        // const resRequest = await Service.getAll()
        const resRequest = await ServiceDetail.GetAllServiceDetail();
        if (!resRequest) {
            res.status(200).send({})
            return
        }
        console.log('here', resRequest)
        res.status(200).send(resRequest)
    } catch (err) {
        console.log('Error: ', err.message)
        res.status(400).send({error: err.message})
    }
};