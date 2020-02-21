const sql = require("../db/db");

const Area = function (area) {
    this.client_id = area.client_id,
        this.action_id = area.action_id,
        this.reaction_id = area.reaction_id,
        this.parameters = area.parameters
};

Area.create = async function (newArea) {
    try {
        var [rows, fields] = await sql.query("INSERT INTO area(client_id,action_id,reaction_id,parameters) VALUES (?,?,?,?)", [newArea.client_id, newArea.action_id, newArea.reaction_id, JSON.stringify(newArea.parameters)])
        if (rows.affectedRows == 0) {
            console.log('Error trying to create an area')
        }

        return { message: "created area" }
    } catch (err) {
        console.log(err)
        throw err
    }
}

Area.getArea = async function (client_id) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM area WHERE client_id = ?", [client_id])
        if (rows.length < 1) {
            console.log('No area found')
            return null
        }
        return rows
    } catch (err) {
        console.log(err)
        throw err
    }
}

Area.findById = async function (client_id, area_id) {
    try {
        console.log(client_id, area_id)
        const [rows, fields] = await sql.query("SELECT * FROM area WHERE client_id = ? AND id = ?", [client_id, area_id])
        if (rows.length < 1) {
            console.log('No area found')
            return null
        }
        return rows[0]
    } catch (err) {
        console.log(err)
        throw err
    }
}

Area.delete = async function (client_id, area_id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM area WHERE client_id = ? AND id = ?", [client_id, area_id])
        if (rows.affectedRows < 1) {
            console.log('No area found')
            throw new Error("not_found " + area_id)
        }
        console.log("DELETED")
        return {message: 'Area deleted'}
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = Area