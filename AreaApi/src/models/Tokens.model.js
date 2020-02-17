//MYSQL

const jwt = require('jsonwebtoken')
const sql = require("../db/db");

const Token = function (token) {
    this.client_id = token.client_id,
        this.token = token.token
};

// NOTE Ok working
Token.refresh = async (id, result) => {
    try {
        var newToken = jwt.sign(id, process.env.JWT_KEY)
        const resRequest = await sql.query("UPDATE tokens SET token = ? WHERE id = ?", [newToken, id], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (resRequest[0].affectedRows == 0) {
            console.log('Not found: ', id)
            result({ message: "cannot update token ", id }, null);
            return;
        }
        console.log('new token : ', newToken)
        result(null, { token: newToken })
    } catch (err) {
        console.log(err)
        result({message: err.message}, null)
    }
};


// NOTE OK working
Token.create = async (clientId, result) => {
    try {
        const resRequest = await sql.query("INSERT INTO tokens SET client_id = ?", [clientId], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        console.log(resRequest[0])
        await Token.refresh(resRequest[0].insertId, (errToken, resToken) => {
            if (errToken) {
                result({message: errToken.message}, null)
                return
            }
            console.log("created token for : ", clientId);
            result(null, resToken)
        });
    } catch (err) {
        console.log(err)
        result({message: err.message}, null)
    }
};

// TODO a tester
Token.findByClientId = async (clientId, result) => {
    try {
        const resRequest = await sql.query("SELECT * FROM tokens WHERE client_id = ?", [clientId], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No tokens found')
            result(null, null)
        }
        console.log("tokens: ", resRequest[0]);
        result(null, resRequest[0])
    } catch (err) {
        console.log(err);
        result({message: err.message}, null)
    }
}

// NOTE ok working
Token.findByClientToken = async (clientToken, result) => {
    try {
        const resRequest = await sql.query("SELECT * FROM tokens WHERE token = ?", [clientToken], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No tokens found')
            result(null, null)
        }
        console.log("tokens: ", resRequest[0]);
        result(null, resRequest[0][0])
    } catch (err) {
        console.log(err);
        result({message: err.message}, null)
    }
}

// TODO a tester
Token.deleteToken = async (clientToken, result) => {
    try {
        const resRequest = await sql.query("DELETE FROM tokens WHERE token = ?", [clientToken], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (resRequest[0].affectedRows < 1) {
            console.log('No tokens found')
            result(null, null)
            return
        }
        console.log("tokens: ", resRequest[0]);
        result(null, {message: 'user deconnected'})
    } catch (err) {
        console.log(err);
        result({message: err.message}, null)
    }
}

// TODO a tester
Token.deleteTokenByClientId = async (clientId, result) => {
    try {
        const resRequest = await sql.query("DELETE FROM tokens WHERE client_id = ?", [clientId], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (res[0].affectedRows < 1) {
            console.log('No tokens found')
            result(null, null)
            return
        }
        console.log("tokens: ", res[0]);
        result(null, {message: 'tokens deleted'})
    } catch (err) {
        console.log(err);
        result({message: err.message}, null)
    }
}

module.exports = Token