const AreaModel = require('../models/Area.model')
const AreaController = require('./area.controller')
const ActionModel = require('../models/Action.model')
const TimerModel = require('../models/Timer.model')

const INTERVAL = 10000
let idIntervalDate = 0
let idInterval = 0

async function checkDate() {
    if (idIntervalDate) {
        clearInterval(idIntervalDate)
    }
    idIntervalDate = setInterval(async function () {
        try {
            const resAction = await ActionModel.findByName('is_date')
            if (!resAction) {
                console.error('Action is_date not found')
                clearInterval(idIntervalDate)
                return
            }

            console.log(new Date())
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

async function checkInterval() {
    if (idInterval) {
        clearInterval(idInterval)
    }
    idInterval = setInterval(async function () {
        try {
            const resAction = await ActionModel.findByName('timer')
            if (!resAction) {
                console.error('Action timer not found')
                clearInterval(idInterval)
                return
            }

            const allTimers = await TimerModel.getAll()
            for (const element of allTimers) {
                try {
                    let newTimerElement = element.current_timer - 1
                    if (newTimerElement === 0) {
                        newTimerElement = element.interval_timer
                        const elementArea = await AreaModel.findById(element.client_id, elementArea.id)
                        if (elementArea) {
                            // NOTE Send the area to trigger it
                            await AreaController.SendToReactionById(elementArea, resAction.id, {message: 'Your timer has been triggered'})
                        }
                        
                    }
                    await TimerModel.updateTimer(newTimerElement, element.id)
                } catch (err) {
                    console.error(err.message)
                }
            }
        } catch (err) {
            console.error(err.message)
        }
    }, 60000);
}


//NOTE ============================================================

/**
 * Create specific data for the area (for exemple init a timer for this area)
 */
exports.createArea = async (area) => {
    try {
        if (area.action_id == 8) {
            const newTimer = new TimerModel({
                client_id: area.client_id,
                interval: area.parameters_action.interval
            })
            await TimerModel.create(newTimer)
        }
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Delete the area (specific for each service (for exemple , delete the timer inthe time table))
 * 
 * @param {JSON} - area
 */
exports.deleteArea = async (area) => {
    try {
        if (area.action_id == 8) {
            await TimerModel.deleteByAreaId(area)
        }
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Call the appropriate reaction from area of the service
 * 
 * @param {JSON} actionResult - 
 */
exports.useReaction = async (actionResult, area) => {
}

/**
 * Init all the timers of the Service
 * 
 * @param {Express} app server express
 */
exports.init = async (app) => {
    await checkDate()
    await checkInterval()
}