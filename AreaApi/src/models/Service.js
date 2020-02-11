// const mongoose = require('mongoose')

// const serviceSchema = mongoose.Schema({
//     name: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true
//     }
// })

// serviceSchema.statics.getAll = async () => {
//     const services = await Service.find()
//     if (!services) {
//         throw new Error({ error: 'No service found' })
//     }
//     return services;
// }

// serviceSchema.statics.getByName = async (name) => {
//     const service = await Service.findOne({name});
//     if (!service) {
//         throw new Error({ error: 'No service found' })
//     }
//     return service
// }

// serviceSchema.statics.getById = async (id) => {
//     const service = await Service.findById(id);
//     if (!service) {
//         throw new Error({ error: 'No service found' })
//     }
//     return service
// }

// const Service = mongoose.model('Service', serviceSchema)

// module.exports = Service

//MySQL below

const sql = require('./db')

// constructor
const Service = function (service) {
    this.name = service.name;
};

Service.create = async (newService, result) => {
    try {
        const res = await sql.query("INSERT INTO services SET ?", [newService]);
        console.log("created customer: ", { id: res.insertId, ...newService });
        result({ id: res.insertId, ...newService });
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
        result(res[0]);
    } catch (err) {
        console.log(err);
        throw err;
    }

}

Service.findById = async (serviceId, result) => {
    try {
        const res = await sql.query(`SELECT * FROM services WHERE id = ?`, [serviceId]);
        if (res[0].length < 1) {
            throw new Error("error: no services found")
        }
        console.log("services: ", res[0])
        result(res[0][0]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

Service.findByName = async (serviceName, result) => {
    try {
        const res = await sql.query(`SELECT * FROM services WHERE name = ?`, [serviceName]);
        if (res[0].length < 1) {
            throw new Error("error: no services found")
        }
        console.log("services: ", res[0])
        result(res[0][0]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = Service;