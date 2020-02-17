//MySQL

const sql = require('../db/db')

// constructor
const Service = function (service) {
    this.name = service.name;
};

// NOTE ok working
Service.getAll = async result => {
    try {
        const resRequest = await sql.query("SELECT * FROM services", [], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result(err, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No services found')
            result(null, null)
        }
        console.log("services: ", resRequest[0]);
        result(null, resRequest[0]);
    } catch (err) {
        console.log(err);
        result(err, null)
    }

}

// TODO a tester
Service.findById = async serviceId => {
    try {
        const res = await sql.query(`SELECT * FROM services WHERE id = ?`, [serviceId]);
        if (res[0].length < 1) {
            throw new Error("error: no services found")
        }
        console.log("services: ", res[0])
        return res[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

Service.findByName = async serviceName => {
    try {
        const res = await sql.query(`SELECT * FROM services WHERE name = ?`, [serviceName]);
        if (res[0].length < 1) {
            throw new Error("error: no services found")
        }
        console.log("services: ", res[0])
        return res[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = Service;