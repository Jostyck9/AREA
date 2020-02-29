//MySQL

const sql = require('../db/db')

/**
* ServiceTokensModel class manage all the database request for service_auth table
* @class
* @classdesc This class connect to the service_auth inside the db
*/
const ServiceTokensModel = function (tokens) {
    this.client_id = tokens.client_id,
    this.service_id = tokens.service_id,
    this.access_token = tokens.access_token || null,
    this.refresh_token = tokens.refresh_token || null,
    this.secret_token = tokens.secret_token || null,
    this.expires_in = tokens.expires_in || null
}

/**
 * Create an ServiceAuth in the database
 * 
 * @param {ServiceTokensModel} newServiceTokens Json of the variables of the newArea
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
ServiceTokensModel.create = async function (newServiceTokens) {
    try {
        var [rows, fields] = await sql.query("INSERT INTO services_auth(client_id,service_id,access_token,refresh_token,secret_token) VALUES (?,?,?,?,?)", [newServiceTokens.client_id, newServiceTokens.service_id, newServiceTokens.access_token, newServiceTokens.refresh_token, newServiceTokens.secret_token])
        if (rows.affectedRows == 0) {
            throw new Error('Error trying to create a serviceAuth')
        }

        return { message: "created serviceAuth" }
    } catch (err) {
        throw err
    }
}

/**
 * Get all the services_auth from the database
 * 
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.getAll = async function() {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM services_auth")
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        throw (err)
    }
}

/**
 * Get a specific service_auth by id from the database
 * 
 * @param {number} serviceAuth Id of the service_auth
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.findById = async function (serviceAuth) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services_auth WHERE id = ?`, [serviceAuth])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        return err
    }
};

/**
 * Get service_auth by client_id from the database
 * 
 * @param {number} clientId Id of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.findByClientId = async function (clientId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services_auth WHERE client_id = ?`, [clientId])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        return err
    }
};

/**
 * Get service_auth by service_id from the database
 * 
 * @param {number} serviceId Id of the service_auth
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.findByServiceId = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services_auth WHERE service_id = ?`, [serviceId])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        return err
    }
};

/**
 * Get service_auth by service_id and client_id from the database
 * 
 * @param {number} serviceId Id of the service_auth
 * @param {number} clientId Id of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.findByServiceAndClientId = async function (serviceId, clientId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services_auth WHERE service_id = ? AND client_id = ?`, [serviceId, clientId])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        return err
    }
};

/**
 * Delete a service_auth by his id in the database
 * 
 * @param {number} id Id of the service_auth
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.remove = async function (id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM services_auth WHERE id = ?", [id])
        if (rows.affectedRows == 0) {
            throw new Error("not_found " + id)
        }
        return { message: 'Service auth deleted ' + id }
    } catch (err) {
        // console.log(err)
        throw err
    }
};

/**
 * Delete all service_auth by his client_id in the database
 * 
 * @param {number} client_id Id of the service_auth
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceTokensModel.removeByClientId = async function (client_id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM services_auth WHERE client_id = ?", [client_id])
        if (rows.affectedRows == 0) {
            throw new Error("not_found")
        }
        return { message: 'Service auth deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
};

module.exports = ServiceTokensModel