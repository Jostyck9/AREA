//MYSQL

const sql = require("../db/db");

/**
* ReactionModel class manage all the database request for reactions table
* @class
* @classdesc This class connect to the reaction inside the db
*/
const ReactionModel = function (reaction) {
    this.service_id = reaction.service_id,
        this.name = reaction.name,
        this.description = reaction.description,
        this.parameters = reaction.parameters
};

/**
 * Get all the reactions from the database
 *
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
ReactionModel.getAll = async function () {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM reactions", [])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Get the reaction with id from the database
 *
 * @param {number} actionId id of the reaction
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ReactionModel.findById = async function (reactionId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM reactions WHERE id = ?`, [reactionId])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        throw err
    }
};

/**
 * Get all the reaction from the service from the database
 *
 * @param {number} serviceId id of the service
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
ReactionModel.findByServiceId = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM reactions WHERE service_id = ?`, [serviceId])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        throw err
    }
};

/**
 * Get the reaction with name from the database
 *
 * @param {number} client_id id of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ReactionModel.findByName = async function (actionName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM reactions WHERE name = ?`, [actionName.toLowerCase()])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        throw err
    }
};

module.exports = ReactionModel