//MYSQL

const sql = require("../db/db");

const Reaction = function (reaction) {
    this.service_id = reaction.service_id,
        this.name = reaction.name,
        this.description = reaction.description,
        this.parameters = reaction.parameters
};

// TODO a tester
Reaction.getAll = async function (result) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM reactions", [])
        if (rows.length < 1) {
            console.log('No reactions found')
            return null
        }
        return rows
    } catch (err) {
        console.log(err);
        throw err
    }
}

// TODO a tester
Reaction.findById = async function (actionId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM reactions WHERE id = ?`, [actionId])
        if (rows.length < 1) {
            console.log('No reactions found')
            return null
        }
        return rows
    } catch (err) {
        console.log(err);
        throw err
    }
};

// TODO a tester
Reaction.findByServiceId = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM reactions WHERE service_id = ?`, [serviceId])
        if (rows.length < 1) {
            console.log('No reactions found')
            return null
        }
        return rows
    } catch (err) {
        console.log(err);
        throw err
    }
};

// TODO a tester
Reaction.findByName = async function (actionName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM reactions WHERE name = ?`, [actionName.toLowerCase()])
        if (rows.length < 1) {
            console.log('No reactions found')
            return null
        }
        return rows[0]
    } catch (err) {
        console.log(err);
        throw err
    }
};

module.exports = Reaction