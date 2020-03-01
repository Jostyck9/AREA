//MYSQL

const validator = require('validator')
const bcrypt = require('bcryptjs')
const sql = require("../db/db");

/**
* UserModel class manage all the database request for reactions table
* @class
* @classdesc This class connect to the user inside the db
*/
const UserModel = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

/**
 * Create a new user in the database
 * 
 * @param {json} newUser New user infos
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.create = async function (newUser) {
    try {
        if (!validator.isEmail(newUser.email))
            throw new Error('Invalid Email address');
        if (newUser.password.length < 7)
            throw new Error('Invalid password size, min 7');
        newUser.password = await bcrypt.hash(newUser.password, 8)
        var [rows, fields] = await sql.query("INSERT INTO users(username,email,password) VALUES (?,?,?)", [newUser.username, newUser.email, newUser.password])
        return { message: "created user :" + newUser.username, id: rows.insertId }
    } catch (err) {
        if (err.code && err.code == 'ER_DUP_ENTRY')
            throw new Error('email already used')
        throw err
    }
};

/**
 * Create a new user by oauth2 in the database
 * 
 * @param {json} newUser New user infos
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.createOAuth2 = async function (newUser) {
    try {
        newUser.password = ''
        var [rows, fields] = await sql.query("INSERT INTO users(username,email,password,is_oauth2) VALUES (?,?,?,1)", [newUser.username, newUser.id, newUser.password])
        return { message: "created user :" + newUser.username, id: rows.insertId }
    } catch (err) {
        if (err.code && err.code == 'ER_DUP_ENTRY')
            throw new Error('email already used')
        throw err
    }
};

/**
 * Find a user by his credentials in the database
 * 
 * @param {string} email Email of the user
 * @param {string} password Password of the client
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.findByCredentials = async function (email, password) {
    var isPasswordMatch = false;

    try {
        if (password.length < 7) {
            throw new Error('Password must have 7 characters')
        }
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length < 1) {
            return null
        }
        if (await bcrypt.compare(password, rows[0].password)) {
            return { id: rows[0].id, username: rows[0].username, email: rows[0].email }
        }
        return null
    } catch (err) {
        throw err
    }
}

/**
 * Find a user by his email in the database
 * 
 * @param {string} userEmail Email of the user
 * @returns {null} If not present in the database
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.findByEmail = async function (userEmail) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE email = ?`, [userEmail])
        if (rows.length < 1) {
            return null
        }
        return rows[0]

    } catch (err) {
        throw err
    }
};

/**
 * Find a user by his id in the database
 * 
 * @param {number} userId Id of the user
 * @returns {null} If not present in the database
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.findById = async function (userId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE id = ?`, [userId])

        if (rows.length < 1) {
            return null
        }
        return rows[0]

    } catch (err) {
        throw err
    }
};

/**
 * Find a user by his name in the database
 * 
 * @param {string} userName Name of the user
 * @returns {null} If not present in the database
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.findByName = async function (userName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE username = ?`, [userName])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        throw err;
    }
};

/**
 * Delete a user by his id in the database
 * 
 * @param {number} id Id of the user
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.remove = async function (id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM users WHERE id = ?", [id])
        if (rows.affectedRows == 0) {
            throw new Error("not_found " + id)
        }
        return { message: 'User deleted ' + id }
    } catch (err) {
        throw err
    }
};

/**
 * Update a user's name by his id in the database
 * 
 * @param {number} id Id of the user
 * @param {string} userName Name of the user
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.updateUsername = async function (id, userName) {
    try {
        if (userName.length == 0)
            throw new Error("Username must not be null")
        const [rows, fields] = await sql.query("UPDATE users SET username = ? WHERE id = ?", [userName, id])
        if (rows.affectedRows == 0) {
            throw new Error("not_found" + id)
        }
        return { message: 'User updated' }
    } catch (err) {
        throw err
    }
};

/**
 * Update a user's password by his id in the database
 * 
 * @param {number} id Id of the user
 * @param {string} password Password of the user
 * @returns {json} Json of the result
 * @throws {error} Contains a message field
 */
UserModel.updatePassword = async function (id, password) {
    try {
        if (password.length < 7)
            throw Error('Invalid password size, min 7');
        password = await bcrypt.hash(password, 8)

        const [rows, fields] = await sql.query("UPDATE users SET password = ? WHERE id = ?", [password, id])
        if (rows.affectedRows == 0) {
            throw { message: "not_found" }
        }
        return ({ message: 'Password updated' })
    } catch (err) {
        throw err
    }
};

module.exports = UserModel