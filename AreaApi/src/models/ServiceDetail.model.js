var Services = require('./Service.model')
var Actions = require('./Action.model')
var Reactions = require('./Reaction.model')

async function GetActions(id) {
    var actionsRes = []

    const actions = await Actions.findByServiceId(id)
    if (actions) {
        actions.forEach(element => {
            // console.log(element)
            actionsRes.push({ name: element.name, id: element.id, description: element.description, parameters: element.parameters, results: element.results })
        });
    }
    // console.log(actionsRes)
    return actionsRes
}

async function GetReactions(id) {
    var reactionsRes = []

    const reactions = await Reactions.findByServiceId(id)
    if (reactions) {
        reactions.forEach(element => {
            reactionsRes.push({ name: element.name, id: element.id, description: element.description, parameters: element.parameters })
        });
    }
    return reactionsRes
}

async function GetServiceDetailById(ServiceId) {
    const service = await Services.findById(ServiceId)
    if (!service)
        return null
    const actions = await GetActions(service.id);
    const reactions = await GetReactions(service.id);
    return { name: service.name, id: service.id, actions: actions, reactions: reactions }
}

async function GetServiceDetailByName(ServiceName) {
    const service = await Services.findByName(ServiceName)
    if (!service)
        return null
    const actions = await GetActions(service.id);
    const reactions = await GetReactions(service.id);
    return { name: service.name, id: service.id, actions: actions || [], reactions: reactions || [] }
}

async function GetServiceDetail(service) {
    const actions = await GetActions(service.id);
    const reactions = await GetReactions(service.id)
    return { name: service.name, id: service.id, actions: actions || [], reactions: reactions || [] }
}

async function GetAllServiceDetail() {

    let res = []
    const services = await Services.getAll()

    if (!services)
        return {}
    for (const element of services) {
        const resService = await GetServiceDetail(element)
        res.push(resService)
    }
    return res;
}

module.exports = {
    GetAllServiceDetail,
    GetServiceDetailById,
    GetServiceDetailByName,
    GetActions,
    GetReactions
}