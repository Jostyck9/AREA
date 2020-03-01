//MYSQL

const jwt = require('jsonwebtoken')
const sql = require("../db/db");

/**
* TokenModel class manage all the database request for reactions table
* @class
* @classdesc This class connect to the token inside the db
*/
const TokenModel = function (token) {
    this.client_id = token.client_id,
        this.token = token.token
};

/**
 * Refresh a token by his id in the database
 * 
 * @param {number} id id of the token
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
TokenModel.refresh = async function (id) {
    try {
        var newToken = jwt.sign(id, process.env.JWT_KEY || '')

        const [rows, fields] = await sql.query("UPDATE tokens SET token = ? WHERE id = ?", [newToken, id])
        if (rows.affectedRows == 0) {
            throw Error("cannot update token " + id)
        }
        return { token: newToken }
    } catch (err) {
        // console.log(err)
        throw err
    }
};


/**
 * Create a token by client if in the database
 * 
 * @param {number} clientId id of the client
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
TokenModel.create = async function (clientId) {
    try {
        const [rows, fields] = await sql.query("INSERT INTO tokens SET client_id = ?", [clientId])

        const resToken = await TokenModel.refresh(rows.insertId)
        return resToken
    } catch (err) {
        // console.log(err)
        throw err
    }
};

/**
 * Get a token by client id from the database
 * 
 * @param {number} clientId id of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
TokenModel.findByClientId = async function (clientId) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM tokens WHERE client_id = ?", [clientId])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Get the token by the token value from the database
 * 
 * @param {string} clientToken Token of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
TokenModel.findByClientToken = async function (clientToken) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM tokens WHERE token = ?", [clientToken])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Delete a token from the database
 * 
 * @param {string} clientToken Token of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
TokenModel.deleteToken = async function (clientToken) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM tokens WHERE token = ?", [clientToken])
        if (rows.affectedRows < 1) {
            return null
        }
        return { message: 'user deconnected' }
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Delete all the token by his client id from the database
 * 
 * @param {number} clientId id of the client
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
TokenModel.deleteTokenByClientId = async function (clientId) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM tokens WHERE client_id = ?", [clientId])

        if (rows.affectedRows < 1) {
            return null;
        }
        return { message: 'tokens deleted' }
    } catch (err) {
        // console.log(err);
        throw err
    }
}

module.exports = TokenModel