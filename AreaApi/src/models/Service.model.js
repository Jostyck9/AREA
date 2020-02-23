//MySQL

const sql = require('../db/db')

// constructor
const Service = function (service) {
    this.name = service.name;
};

// NOTE ok working
Service.getAll = async function() {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM services")
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err);
        throw (err)
    }
}

// NOTE ok working
Service.findById = async function (serviceId) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services WHERE id = ?`, [serviceId])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        return err
    }
};

// NOTE ok working
Service.findByName = async function (serviceName) {
    try {
        const [rows, fields] = await sql.query(`SELECT * FROM services WHERE name = ?`, [serviceName.toLowerCase()])
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } catch (err) {
        // console.log(err);
        throw err
    }
};

module.exports = Service;