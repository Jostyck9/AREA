//MySQL

const sql = require('./db')

// constructor
const Service = function (service) {
    this.name = service.name;
};

Service.create = async newService => {
    try {
        const res = await sql.query("INSERT INTO services SET ?", [newService]);
        console.log("created service: ", { id: res.insertId, ...newService });
        return { id: res.insertId, ...newService };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

Service.getAll = async result => {
    try {
        const res = await sql.query("SELECT * FROM services");
        if (res[0].length < 1) {
            throw new Error("error: no services found")
        }
        console.log("services: ", res[0]);
        return res[0];
    } catch (err) {
        console.log(err);
        throw err;
    }

}

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