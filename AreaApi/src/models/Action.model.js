//MYSQL

const sql = require("../db/db");

/**
* ActionModel class manage all the database request for actions table
* @class
* @classdesc This class connect to the actions inside the db
*/
const ActionModel = function (action) {
    this.service_id = action.service_id,
    this.name = action.name,
    this.description = action.description,
    this.results = action.results
};

/**
 * Get all the actions from the database
 * 
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
ActionModel.getAll = async function () {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM actions", [])
        if (rows.length < 1) {
            //console.log('No actions found')
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Get a specific action from the database
 * 
 * @param {number} actionId The id of the action
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ActionModel.findById = async function (actionId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM actions WHERE id = ?`, [actionId]);
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        throw err
    }
};

/**
 * Get all the actions from a specific service from the database
 * 
 * @param {number} serviceId The id of the service
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ActionModel.findByServiceId = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM actions WHERE service_id = ?`, [serviceId])
        if (rows.length < 1) {
            return null
        }
        return (rows)
    } catch (err) {
        throw (err)
    }
};

/**
 * Get all the actions from his name from the database
 * 
 * @param {string} actionName The name of the action
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ActionModel.findByName = async function (actionName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM actions WHERE name = ?`, [actionName.toLowerCase()]);
        if (rows.length < 1) {
            return null;
        }
        return rows[0];
    } catch (err) {
        throw (err)
    }
};

module.exports = ActionModel