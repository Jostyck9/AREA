const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')

const INTERVAL = 10000
let idInterval = 0

exports.checkDate = () => {
    if (idInterval) {
        clearInterval(idInterval)
    }
    idInterval = setInterval(async function () {
        try {
            const resAction = await ActionModel.findByName('is_date')
            if (!resAction) {
                console.error('Action is_date not found')
                clearInterval(idInterval)
                return
            }

            const areas = await AreaModel.findByActionId(resAction.id)
            if (areas != null) {
                for (const element of areas) {
                    // TODO check la date
                    console.log(element.id)
                    await AreaModel.delete(element.client_id, element.id)
                    // TODO call reactions
                }
            }

        } catch (err) {
            console.error(err.message)
        }
    }, INTERVAL);
}

exports.useReaction = (actionResult, area) => {
}

exports.init = () => {
    this.checkDate()
}