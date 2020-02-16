//MYSQL

const jwt = require('jsonwebtoken')
const sql = require("./db.js");

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
                result(err, null)
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
        result(err, null)
    }
};


// NOTE OK working
Token.create = async (clientId, result) => {
    try {
        const resRequest = await sql.query("INSERT INTO tokens SET client_id = ?", [clientId], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        console.log(resRequest[0])
        console.log('end')
        await Token.refresh(resRequest[0].insertId, (errToken, resToken) => {
            if (errToken)
                throw new Error(errToken)
            console.log("created token for : ", clientId);
            result(null, resToken)
        });
    } catch (err) {
        console.log(err)
        result(err, null)
    }
};

// TODO a tester
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

// TODO a tester
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

// TODO a tester
Token.deleteToken = async clientToken => {
    try {
        const res = await sql.query("DELETE FROM tokens WHERE token = ?", [clientToken]);
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

// TODO a tester
Token.deleteTokenByClientId = async clientId => {
    try {
        const res = await sql.query("DELETE FROM tokens WHERE client_id = ?", [clientId]);
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