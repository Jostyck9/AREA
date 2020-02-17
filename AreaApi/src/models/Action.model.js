//MYSQL

const sql = require("../db/db");

const Action = function (action) {
    this.service_id = action.service_id,
    this.name = action.name,
    this.description = action.description,
    this.results = action.results
};

// TODO a tester
Action.getAll = async function () {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM actions", [])
        if (rows.length < 1) {
            console.log('No actions found')
            return null
        }
        return rows
    } catch (err) {
        console.log(err);
        throw err
    }
}

// TODO a tester
Action.findById = async function (actionId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM actions WHERE id = ?`, [actionId]);
        if (rows.length < 1) {
            console.log('No actions found')
            return null
        }
        return rows[0]
    } catch (err) {
        console.log(err)
        throw err
    }
};

// NOTE OKOKOKOK
Action.findByServiceId = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM actions WHERE service_id = ?`, [serviceId])
        if (rows[0].length < 1) {
            console.log('No actions found')
            return null
        }
        return (rows)
    } catch (err) {
        console.log(err)
        throw (err)
    }
};

// TODO a tester
Action.findByName = async function (actionName) {
    try {
        console.log(actionName)
        const [rows, fields] = await sql.query(`SELECT * FROM actions WHERE name = ?`, [actionName.toLowerCase()]);
        if (rows.length < 1) {
            console.log('No actions found')
            return null;
        }
        console.log(rows)
        return rows[0];
    } catch (err) {
        console.log(err);
        throw (err)
    }
};

module.exports = Action