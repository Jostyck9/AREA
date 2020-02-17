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
            console.log('No services found')
            return null
        }
        return rows
    } catch (err) {
        console.log(err);
        throw (err)
    }
}

// NOTE ok working
Service.findById = async (serviceId, result) => {
    try {
        const resRequest = await sql.query(`SELECT * FROM services WHERE id = ?`, [serviceId], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No services found')
            result(null, null)
            return
        }
        // console.log("services: ", resRequest[0])
        result(null, resRequest[0][0])
    } catch (err) {
        console.log(err);
        result({message: err.message}, null)
    }
};

// NOTE ok working
Service.findByName = async (serviceName, result) => {
    try {
        const resRequest = await sql.query(`SELECT * FROM services WHERE name = ?`, [serviceName], (err, res) => {
            if (err) {
                console.log('Error: ', err)
                result({message: err}, null)
                return
            }
        });
        if (resRequest[0].length < 1) {
            console.log('No services found')
            result(null, null)
            return
        }
        // console.log("services: ", resRequest[0])
        result(null, resRequest[0][0])
    } catch (err) {
        console.log(err);
        result({message: err.message}, null)
    }
};

module.exports = Service;