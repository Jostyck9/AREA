const sql = require("../db/db");

/**
* DropboxModel class manage all the database request for dropbox table
* @class
* @classdesc This class connect to the dropbox inside the db
*/
const DropboxModel = function (newDropbox) {
    this.client_id = newDropbox.client_id,
        this.dropbox_id = newDropbox.dropbox_id,
        this.dropbox_cursor = newDropbox.dropbox_cursor
};

/**
 * Create a Dropbox data in the database
 * 
 * @param {DropboxModel} newDropbox Json of the variables of the newDropbox
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
DropboxModel.create = async function (newDropbox) {
    try {
        var [rows, fields] = await sql.query("INSERT INTO dropbox(client_id,dropbox_id,dropbox_cursor) VALUES (?,?,?)", [newDropbox.client_id, newDropbox.dropbox_id, newDropbox.dropbox_cursor])
        if (rows.affectedRows == 0) {
            throw('Error trying to create a dropbox line')
        }

        return { message: "created dropbox line" }
    } catch (err) {
        throw err
    }
}

/**
 * Delete a Dropbox data in the database
 * 
 * @param {number} clientId id of the client
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
DropboxModel.deleteByClientId = async function (clientId) {
    try {
        var [rows, fields] = await sql.query("DELETE FROM dropbox WHERE client_id = ?", [clientId])
        if (rows.affectedRows == 0) {
            throw('Error trying to delete a dropbox line')
        }

        return { message: "deleted dropbox line" }
    } catch (err) {
        throw err
    }
}

/**
 * Delete a Dropbox data in the database
 * 
 * @param {number} dropboxId id of Dropbox client
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
DropboxModel.deleteByDropboxId = async function (dropboxId) {
    try {
        var [rows, fields] = await sql.query("DELETE FROM dropbox WHERE dropbox_id = ?", [dropboxId])
        if (rows.affectedRows == 0) {
            throw('Error trying to delete a dropbox line')
        }

        return { message: "deleted dropbox line" }
    } catch (err) {
        throw err
    }
}

/**
 * Delete a Dropbox data in the database
 * 
 * @param {number} id of the entry
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
DropboxModel.deleteById = async function (id) {
    try {
        var [rows, fields] = await sql.query("DELETE FROM dropbox WHERE id = ?", [id])
        if (rows.affectedRows == 0) {
            throw('Error trying to delete a dropbox line')
        }

        return { message: "deleted dropbox line" }
    } catch (err) {
        throw err
    }
}

/**
 * Find a Dropbox data in the database by clientId
 * 
 * @param {number} clientId Id of the client
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
DropboxModel.findByClientId = async function (clientId) {
    try {
        var [rows, fields] = await sql.query("SELECT * FROM dropbox WHERE client_id = ?", [clientId])
        if (rows.length == 0) {
            return null
        }
        return rows[0]
    } catch (err) {
        throw err
    }
}

/**
 * Find a Dropbox data in the database by dropbox account id
 * 
 * @param {number} accountId Id of the client
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
DropboxModel.findByAccountId = async function (accountId) {
    try {
        var [rows, fields] = await sql.query("SELECT * FROM dropbox WHERE dropbox_id = ?", [accountId])
        if (rows.length == 0) {
            return null
        }
        return rows
    } catch (err) {
        throw err
    }
}

DropboxModel.updateCursor = async function (newCursor, id) {
    try {
        var [rows, fields] = await sql.query("UPDATE dropbox SET dropbox_cursor = ? WHERE client_id = ?", [newCursor, id])
        if (rows.affectedRows == 0) {
            throw Error("cannot update client " + id)
        }
        return { message: "created dropbox line" }
    } catch (err) {
        throw err
    }
}

module.exports = DropboxModel