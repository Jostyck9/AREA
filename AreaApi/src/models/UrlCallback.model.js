const sql = require("../db/db");
const IdModel = require("./id.model")

/**
* UrlCallbackModel class manage all the database request for UrlCallback table
* @class
* @classdesc This class connect to the token inside the db
*/
const UrlCallbackModel = function (newUrl) {
    this.urlCallback = newUrl.urlCallback,
    this.clientId = newUrl.clientId || null
};

/**
 * Create a urlCallback in the database
 * 
 * @param {UrlCallbackModel} newUrl url callback for 
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UrlCallbackModel.create = async function (newUrl) {
    try {
        newUrl.idUrl = IdModel.NewID()
        const [rows, fields] = await sql.query("INSERT INTO url_callback (url_id,url,client_id) VALUES (?,?,?)", [newUrl.idUrl, newUrl.urlCallback, newUrl.clientId || null])
        if (rows.affected < 1) {
            throw new Error('Failed to add new urlCallback')
        }
        newUrl.id = rows.insertId
        return newUrl
    } catch (err) {
        // console.log(err)
        throw err
    }
};

/**
 * Find a urlCallback by his id in the database
 * 
 * @param {number} id Id of the urlCallback
 * @returns {null} If not present in the database
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UrlCallbackModel.findById = async function (id) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM url_callback WHERE id = ?`, [id])
        if (rows.length < 1) {
            return null
        }
        console.log(rows[0])
        return rows[0]
    } catch (err) {
        // console.log(err)
        throw err
    }
};

/**
 * Find a urlCallback by his url_id in the database
 * 
 * @param {string} urlId urlId of the urlCallback
 * @returns {null} If not present in the database
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UrlCallbackModel.findByUrlId = async function (urlId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM url_callback WHERE url_id = ?`, [urlId])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err)
        throw err
    }
};

/**
 * Delete a urlCallback by his url_id in the database
 * 
 * @param {string} urlId urlId of the urlCallback
 * @returns {null} If not present in the database
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UrlCallbackModel.deleteByUrlId = async function (urlId) {
    try {
        const [rows, fields] = await sql.query(`DELETE FROM url_callback WHERE url_id = ?`, [urlId])
        if (rows.affected < 1) {
            throw new Error('Failed to delete urlCallback')
        }
        return {message: 'Deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
};

module.exports = UrlCallbackModel