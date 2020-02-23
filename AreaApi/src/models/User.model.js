//MYSQL

const validator = require('validator')
const bcrypt = require('bcryptjs')
const sql = require("../db/db");

// constructor
const User = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.create = async function (newUser) {
    try {
        if (!validator.isEmail(newUser.email))
            throw new Error('Invalid Email address');
        if (newUser.password.length < 7)
            throw new Error('Invalid password size, min 7');

        newUser.password = await bcrypt.hash(newUser.password, 8)
        var [rows, fields] = await sql.query("INSERT INTO users(username,email,password) VALUES (?,?,?)", [newUser.username, newUser.email, newUser.password])
        return { message: "created user :" + newUser.username, id: rows.insertId }
    } catch (err) {
        // console.log(err)
        if (err.code && err.code == 'ER_DUP_ENTRY')
            throw new Error('email already used')
        throw err
    }
};

// NOTE OK working
User.findByCredentials = async function (email, password) {
    var isPasswordMatch = false;

    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length < 1) {
            return null
        }
        if (await bcrypt.compare(password, rows[0].password)) {
            return { id: rows[0].id, username: rows[0].username, email: rows[0].email }
        }
        return null
    } catch (err) {
        // console.log(err)
        throw err
    }
}

// NOTE OK working
User.findByEmail = async function (userEmail) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE email = ?`, [userEmail])
        if (rows.length < 1) {
            return null
        }
        return rows[0]

    } catch (err) {
        // console.log(err)
        throw err
    }
};

// NOTE ok working
User.findById = async function (userId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE id = ?`, [userId])

        if (rows.length < 1) {
            return null
        }
        return rows[0]

    } catch (err) {
        // console.log(err)
        throw err
    }
};

// NOTE ok working
User.findByName = async function (userName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM users WHERE username = ?`, [userName])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err)
        throw err;
    }
};

// NOTE OK working
User.remove = async function (id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM users WHERE id = ?", [id])
        if (rows.affectedRows == 0) {
            throw new Error("not_found " + id)
        }
        return { message: 'User deleted ' + id }
    } catch (err) {
        // console.log(err)
        throw err
    }
};

// NOTE Ok working
User.updateUsername = async function (id, userName) {
    try {
        if (userName.length == 0)
            throw new Error("Username must not be null")
        const [rows, fields] = await sql.query("UPDATE users SET username = ? WHERE id = ?", [userName, id])
        if (rows.affectedRows == 0) {
            throw new Error("not_found" + id)
        }
        return { message: 'User updated' }
    } catch (err) {
        // console.log(err)
        throw err
    }
};

// NOTE Ok working
User.updatePassword = async function (id, password) {
    try {
        if (password.length < 7)
            throw Error('Invalid password size, min 7');
        password = await bcrypt.hash(password, 8)

        const [rows, fields] = await sql.query("UPDATE users SET password = ? WHERE id = ?", [password, id])
        if (resRequest.affectedRows == 0) {
            throw { message: "not_found" }
        }
        return ({ message: 'Password updated' })
    } catch (err) {
        // console.log(err)
        throw err
    }
};

module.exports = User