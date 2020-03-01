const sql = require("../db/db");

/**
* GithubModel class manage all the database request for github table
* @class
* @classdesc This class connect to the github inside the db
*/
const GithubModel = function (github) {
    this.client_id = github.client_id,
    this.username = github.username,
    this.repo_name = github.repo_name,
    this.webhook_type = github.webhook_type
};


/**
 * Create an GithubObject in the database
 *
 * @param {Github} newGithub Json of the variables of the newGithub
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
GithubModel.create = async function (newGithub) {
    try {
        var [rows, fields] = await sql.query("INSERT INTO github(client_id,username,repo_name,webhook_type) VALUES (?,?,?,?)", [newGithub.client_id, JSON.stringify(newGithub.username), JSON.stringify(newGithub.repo_name), JSON.stringify(newGithub.webhook_type)])
        if (rows.affectedRows == 0) {
            throw('Error trying to create an githubObject')
        }

        return { message: "created githubObject" }
    } catch (err) {
        throw err
    }
}

/**
 * Delete a specific githubObject of the user from the database
 *
 * @param {number} client_id id of the client
 * @param {number} githubObject_id id of the githubObject
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
GithubModel.delete = async function (client_id, githubObject_id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM github WHERE client_id = ? AND id = ?", [client_id, githubObject_id])
        if (rows.affectedRows < 1) {
            throw new Error("not_found " + githubObject_id)
        }
        return {message: 'githubObject deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
}

/**
 * Get all the githubObject of the user from the database
 *
 * @param {number} client_id id of the client
 * @returns {null} If the database is empty
 * @returns {array.<json>} Json of the result
 * @throws {error} Contains a message field
 */
GithubModel.getGithubObject = async function (client_id) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM github WHERE client_id = ?", [client_id])
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        throw err
    }
}

/**
 * Get the specific githubObject of the user from the database
 *
 * @param {number} client_id id of the client
 * @param {number} githubObject_id id of the githubObject
 * @returns {null} If the database is empty
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
GithubModel.findById = async function (client_id, githubObject_id) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM github WHERE client_id = ? AND id = ?", [client_id, githubObject_id])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err)
        throw err
    }
}

module.exports = GithubModel