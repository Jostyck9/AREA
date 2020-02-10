var Services = require('./Service')
var Actions = require('./Action')
var Reactions = require('./Reaction')

async function GetActions(id)
{
    var actionsRes = []

    try {
        const actions = await Actions.getFromServiceId(id)

        actions.forEach(element => {
            actionsRes.push({name: element.name, id: element._id, description: element.description, results: element.res})
        });
    } catch (error) {
        return []
    }
    return actionsRes
}

async function GetReactions(id)
{
    var reactionsRes = []

    try {
        const reactions = await Reactions.getFromServiceId(id)

        reactions.forEach(element => {
            reactionsRes.push({name: element.name, id: element._id, description: element.description, parameters: element.parameters})
        });
    } catch (error) {
        return []
    }
    return reactionsRes
}

async function GetServiceDetailByName(ServiceName)
{
    const service = await Services.getByName(ServiceName)
    const actions = await GetActions(id)
    const reactions = await GetReactions(id)

    return {name: service._name, id: service._id, actions: actions, reactions: reactions}
}

async function GetServiceDetailById(id)
{
    const service = await Services.getById(id)
    const actions = await GetActions(id)
    const reactions = await GetReactions(id)

    return {name: service.name,  id: service._id,actions: actions, reactions: reactions}
}

async function GetAllServiceDetail()
{
    const services = await Services.getAll();
    var res = []

    for (const element of services) {
        res.push(await GetServiceDetailById(element._id))
    }
    return res
}

module.exports = {
    GetAllServiceDetail,
    GetServiceDetailById,
    GetServiceDetailByName,
    GetActions,
    GetReactions
}