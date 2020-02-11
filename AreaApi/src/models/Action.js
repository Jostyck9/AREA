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

Action.getAll = result => {
    sql.query("SELECT * FROM actions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("actions: ", res);
        result(null, res);
    });
}

Action.findById = (actionId, result) => {
    sql.query(`SELECT * FROM actions WHERE id = ${actionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found action: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Action with the id
        result({ kind: "not_found" }, null);
    });
};

Action.findByServiceId = (serviceId, result) => {
    sql.query(`SELECT * FROM actions WHERE service_id = ${serviceId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found actions: ", res);
            result(null, res);
            return;
        }

        // not found Action with the id
        result({ kind: "not_found" }, null);
    });
};

Action.findByName = (actionName, result) => {
    sql.query(`SELECT * FROM actions WHERE name = ${actionName}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found action: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Action