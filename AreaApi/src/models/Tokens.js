//MYSQL

const jwt = require('jsonwebtoken')
const sql = require("./db.js");

const Token = function (token) {
    this.client_id = token.client_id,
        this.token = token.token
};

Token.create = async clientId => {
    try {
        var newToken = jwt.sign(clientId, process.env.JWT_KEY)
        const res = await sql.query("INSERT INTO tokens SET client_id = ?, token = ?", [clientId, newToken]);
        console.log("created token for : ", clientId);
        return newToken;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

Token.findByClientId = async clientId => {
    try {
        const res = await sql.query("SELECT * FROM tokens WHERE client_id = ?", [clientId]);
        if (res[0].length < 1) {
            throw new Error("error: no tokens found")
        }
        console.log("tokens: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Token.findByClientToken = async clientToken => {
    try {
        const res = await sql.query("SELECT * FROM tokens WHERE token = ?", [clientToken]);
        if (res[0].length < 1) {
            throw new Error("error: no tokens found")
        }
        console.log("tokens: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Token.deleteToken = async clientToken => {
    try {
        const res = await sql.query("DELETE * FROM tokens WHERE token = ?", [clientToken]);
        if (res[0].length < 1) {
            throw new Error("error: no tokens found")
        }
        console.log("tokens: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Token.deleteTokenByClientId = async clientId => {
    try {
        const res = await sql.query("DELETE * FROM tokens WHERE client_id = ?", [clientId]);
        if (res[0].length < 1) {
            throw new Error("error: no tokens found")
        }
        console.log("tokens: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = Token