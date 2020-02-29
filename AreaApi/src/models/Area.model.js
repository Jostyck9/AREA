const sql = require("../db/db");

/**
* AreaModel class manage all the database request for area table
* @class
* @classdesc This class connect to the area inside the db
*/
const AreaModel = function (area) {
    this.client_id = area.client_id,
        this.action_id = area.action_id,
        this.reaction_id = area.reaction_id,
        this.parameters_action = area.parameters_action,
        this.parameters_reaction = area.parameters_reaction
};

/**
 * Create an Area in the database
 *
 * @param {Area} newArea Json of the variables of the newArea
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
AreaModel.create = async function (newArea) {
    try {
        var [rows, fields] = await sql.query("INSERT INTO area(client_id,action_id,reaction_id,parameters_action,parameters_reaction) VALUES (?,?,?,?,?)", [newArea.client_id, newArea.action_id, newArea.reaction_id, JSON.stringify(newArea.parameters_action), JSON.stringify(newArea.parameters_reaction)])
        if (rows.affectedRows == 0) {
            throw('Error trying to create an area')
        }
        newArea.id = rows.insertId
        return newArea
    } catch (err) {
        throw err
    }
}

/**
 * Get all the area from the user from the database
 *
 * @param {number} client_id id of the client
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
AreaModel.getArea = async function (client_id) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM area WHERE client_id = ?", [client_id])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        throw err
    }
}

/**
 * Get the specific area from the user from the database
 *
 * @param {number} client_id id of the client
 * @param {number} area_id id of the area
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
AreaModel.findById = async function (client_id, area_id) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM area WHERE client_id = ? AND id = ?", [client_id, area_id])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err)
        throw err
    }
}

AreaModel.findByActionId = async function (action_id) {
    //Find all areas that has this action
    try {
        const [rows, fields] = await sql.query("SELECT * FROM area WHERE action_id = ?", [action_id])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Get the specific area by action_id from the database
 * 
 * @param {number} action_id id of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
AreaModel.findByActionId = async function (action_id) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM area WHERE action_id = ?", [action_id])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err)
        throw err
    }
}

/**
 * Delete a specific area from the user from the database
 *
 * @param {number} client_id id of the client
 * @param {number} area_id id of the area
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
AreaModel.delete = async function (client_id, area_id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM area WHERE client_id = ? AND id = ?", [client_id, area_id])
        if (rows.affectedRows < 1) {
            throw new Error("not_found " + area_id)
        }
        return {message: 'Area deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
}

module.exports = AreaModel