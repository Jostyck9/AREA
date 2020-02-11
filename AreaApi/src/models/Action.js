// const mongoose = require('mongoose')

// const actionSchema = mongoose.Schema({
//     service: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Service', 
//         required: true
//     },
//     name: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     res: {
//         type: JSON,
//         required: true
//     }
// })

// actionSchema.statics.getAll = async () => {
//     const actions = await Action.find()
//     if (!actions) {
//         throw new Error({ error: 'No action found' });
//     }
//     return actions;
// }

// actionSchema.statics.getFromServiceId = async (service) => {
//     const actions = await Action.find( {service} );
//     if (!actions) {
//         throw new Error({ error: 'No action found' });
//     }
//     return actions;
// }

// actionSchema.statics.getByName = async (name) => {
//     const service = await Action.findOne( {name} );
//     if (!service) {
//         throw new Error({ error: 'No action found' })
//     }
//     return service
// }

// actionSchema.statics.getById = async (id) => {
//     const actions = await Action.findById(id);
//     if (!actions) {
//         throw new Error({ error: 'No action found' });
//     }
//     return actions;
// }

// const Action = mongoose.model('Action', actionSchema)

//MYSQL

const sql = require("./db.js");

const Action = function (action) {
    this.service_id = action.service_id,
    this.name = action.name,
    this.description = action.description,
    this.results = action.results
};

Action.create = (newAction, result) => {
    sql.query("INSERT INTO actions SET ?", newAction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created action: ", { id: res.insertId, ...newAction });
        result(null, { id: res.insertId, ...newAction });
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

module.exports = Action