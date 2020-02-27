//MySQL

const sql = require('../db/db')

/**
* ServiceModel class manage all the database request for service table
* @class
* @classdesc This class connect to the service inside the db
*/
const ServiceModel = function (service) {
    this.name = service.name;
};

/**
 * Get all the services from the database
 * 
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
ServiceModel.getAll = async function() {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM services")
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
 * Get a specific service from id from the database
 * 
 * @param {number} serviceId Id of the service
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceModel.findById = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services WHERE id = ?`, [serviceId])
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
 * Get a specific service by name from the database
 * 
 * @param {string} serviceName Name of the service
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
ServiceModel.findByName = async function (serviceName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services WHERE name = ?`, [serviceName.toLowerCase()])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        throw err
    }
};

module.exports = ServiceModel;