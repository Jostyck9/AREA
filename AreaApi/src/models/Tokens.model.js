//MYSQL

const jwt = require('jsonwebtoken')
const sql = require("../db/db");

const Token = function (token) {
    this.client_id = token.client_id,
        this.token = token.token
};

// NOTE Ok working
Token.refresh = async function (id) {
    try {
        var newToken = jwt.sign(id, process.env.JWT_KEY)

        const [rows, fields] = await sql.query("UPDATE tokens SET token = ? WHERE id = ?", [newToken, id])
        if (rows.affectedRows == 0) {
            console.log('Not found: ', id)
            throw Error("cannot update token " + id)
        }
        return { token: newToken }
    } catch (err) {
        console.log(err)
        throw err
    }
};


// NOTE OK working
Token.create = async function (clientId) {
    try {
        const [rows, fields] = await sql.query("INSERT INTO tokens SET client_id = ?", [clientId])

        const resToken = await Token.refresh(rows.insertId)
        return resToken
    } catch (err) {
        console.log(err)
        throw err
    }
};

// TODO a tester
Token.findByClientId = async function (clientId) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM tokens WHERE client_id = ?", [clientId])
        if (rows.length < 1) {
            console.log('No tokens found')
            return null
        }
        return rows[0]
    } catch (err) {
        console.log(err);
        throw err
    }
}

// NOTE ok working
Token.findByClientToken = async function (clientToken) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM tokens WHERE token = ?", [clientToken])
        if (rows.length < 1) {
            console.log('No tokens found')
            return null
        }
        return rows[0]
    } catch (err) {
        console.log(err);
        throw err
    }
}

// TODO a tester
Token.deleteToken = async function (clientToken) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM tokens WHERE token = ?", [clientToken])
        if (rows.affectedRows < 1) {
            console.log('No tokens found')
            return null
        }
        return { message: 'user deconnected' }
    } catch (err) {
        console.log(err);
        throw err
    }
}

// TODO a tester
Token.deleteTokenByClientId = async function (clientId) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM tokens WHERE client_id = ?", [clientId])

        if (rows.affectedRows < 1) {
            console.log('No tokens found')
            return null;
        }
        return { message: 'tokens deleted' }
    } catch (err) {
        console.log(err);
        throw err
    }
}

module.exports = Token