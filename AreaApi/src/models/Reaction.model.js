//MYSQL

const sql = require("../db/db");

const Reaction = function (reaction) {
    this.service_id = reaction.service_id,
    this.name = reaction.name,
    this.description = reaction.description,
    this.parameters = reaction.parameters
};

// TODO a tester
Reaction.getAll = async () => {
    try {
        const res = await sql.query("SELECT * FROM reactions");
        if (res[0].length < 1) {
            throw new Error("error: no reactions found")
        }
        console.log("reactions: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// TODO a tester
Reaction.findById = async actionId => {
    try {
        const res = await sql.query(`SELECT * FROM reactions WHERE id = ?`, [actionId]);
        if (res[0].length < 1) {
            throw new Error("error: no reactions found")
        }
        console.log("reactions: ", res[0])
        return res[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// TODO a tester
Reaction.findByServiceId = async serviceId => {
    try {
        const res = await sql.query(`SELECT * FROM reactions WHERE service_id = ?`, [serviceId]);
        if (res[0].length < 1) {
            throw new Error("error: no reactions found")
        }
        console.log("reactions: ", res[0])
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// TODO a tester
Reaction.findByName = async actionName => {
    try {
        const res = await sql.query(`SELECT * FROM reactions WHERE name = ?`, [actionName]);
        if (res[0].length < 1) {
            throw new Error("error: no reactions found")
        }
        console.log("reactions: ", res[0][0])
        return res[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = Reaction