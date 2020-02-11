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

// constructor
const Service = function (service) {
    this.name = service.name;
};

Service.create = (newService, result) => {
    sql.query("INSERT INTO services SET ?", newService, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newService });
        result(null, { id: res.insertId, ...newService });
    });
};

Service.getAll = result => {
    sql.query("SELECT * FROM services", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("services: ", res);
        result(null, res);
    });
}

Service.findById = (serviceId, result) => {
    sql.query(`SELECT * FROM services WHERE id = ${serviceId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found service: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Service.findByName = (serviceName, result) => {
    sql.query(`SELECT * FROM services WHERE name = ${serviceName}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found service: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Service;