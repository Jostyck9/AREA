//MYSQL

const sql = require("../db/db");

const Action = function (action) {
    this.service_id = action.service_id,
    this.name = action.name,
    this.description = action.description,
    this.results = action.results
};

// TODO a tester
Action.getAll = async () => {
    try {
        const res = await sql.query("SELECT * FROM actions");
        if (res[0].length < 1) {
            throw new Error("error: no actions found")
        }
        console.log("actions: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// TODO a tester
Action.findById = async actionId => {
    try {
        const res = await sql.query(`SELECT * FROM actions WHERE id = ?`, [actionId]);
        if (res[0].length < 1) {
            throw new Error("error: no actions found")
        }
        console.log("actions: ", res[0])
        return res[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// TODO a tester
Action.findByServiceId = async serviceId => {
    try {
        const res = await sql.query(`SELECT * FROM actions WHERE service_id = ?`, [serviceId]);
        if (res[0].length < 1) {
            throw new Error("error: no actions found")
        }
        console.log("actions: ", res[0])
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// TODO a tester
Action.findByName = async actionName => {
    try {
        const res = await sql.query(`SELECT * FROM actions WHERE name = ?`, [actionName]);
        if (res[0].length < 1) {
            throw new Error("error: no actions found")
        }
        console.log("actions: ", res[0][0])
        return res[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = Action