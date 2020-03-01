const sql = require("../db/db");

/**
 * 
 * @param {*} timer Contains a client_id field and a interval field
 */
const TimerModel = function (timer) {
    this.client_id = timer.client_id,
        this.area_id = timer.area_id,
        this.interval = timer.interval
};

/**
 * Create a new timer for client_id
 * 
 * @param {TimerModel} newTimer - New timer to create
 * @throws
 */
TimerModel.create = async function (newTimer) {
    try {
        if (newTimer.interval === 0) {
            throw('Error trying to create a timer, interval cannot be 0')
        }
        var [rows, fields] = await sql.query("INSERT INTO timer(client_id,area_id,interval_timer,current_timer) VALUES (?,?,?,?)", [newTimer.client_id, newTimer.area_id, newTimer.interval, newTimer.interval])
        if (rows.affectedRows == 0) {
            throw('Error trying to create a timer')
        }

        return { message: "created timer" }
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Update a timer's value inside the timer db
 * 
 * @param {number} timerNumber - The new value of the timer
 * @param {number} id - Id of the timer
 * @throws
 * @returns {JSON} - With a message field
 */
TimerModel.updateTimer = async function (timerNumber, id) {
    try {
        const [rows, fields] = await sql.query("UPDATE timer SET current_timer = ? WHERE id = ?", [timerNumber, id])
        if (rows.affectedRows == 0) {
            throw Error("cannot update timer " + id)
        }
        return ({message: 'updated'})
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Get all the timer from the db
 * 
 * @returns {Array} - Array of timer
 * @throws
 */
TimerModel.getAll = async function () {
    try {
        var [rows, fields] = await sql.query("SELECT * FROM timer", [])
        if (rows.length == 0) {
            return []
        }
        return rows
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Delete a timer from the db
 * 
 * @param {number} id - Id of the timer
 * @throws
 */
TimerModel.delete = async function (id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM timer WHERE id = ?", [id])
        if (rows.affectedRows < 1) {
            throw new Error("not_found " + id)
        }
        return {message: 'Timer deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
}

/**
 * Delete a timer by area_id from the db
 * 
 * @param {number} idArea - Id of the area from timer
 * @throws
 */
TimerModel.deleteByAreaId = async function (idArea) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM timer WHERE area_id = ?", [idArea])
        if (rows.affectedRows < 1) {
            throw new Error("not_found " + id)
        }
        return {message: 'Timer deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
}

module.exports = TimerModel