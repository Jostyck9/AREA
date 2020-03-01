const sql = require("../db/db");

/**
 * SpotifyModel class manage all the database request for spotify table
 * @class
 * @classdesc
 * @param {JSON} newSpotify 
 */
const SpotifyModel = function (newSpotify) {
    this.client_id = newSpotify.client_id,
    this.area_id = newSpotify.area_id,
    this.tracks = newSpotify.tracks
}

/**
 * Convert the tracks into a string separated by semicolons
 * 
 * @param {Array.<String>} tracks
 * @returns {String}
 */
SpotifyModel.convertTracksToString = function (tracks) {
    var res = ""
    tracks.forEach(element => {
        if (res !== "") {
            res += ";"
        }
        res += element
    });
    return res
}

/**
 * Convert a tracks string into a string array
 * 
 * @param {String} tracks
 * @returns {Array.<String>}
 */
SpotifyModel.convertTracksToArray = function (tracks) {
    return tracks.split(";")
}

/**
 * Create an Spotify line in the database
 *
 * @param {SpotifyModel} newSpotify Json of the variables of the newSpotify
 * @returns {json} Json of the result with a message field
 * @throws {error} Contains a message field
 */
SpotifyModel.create = async function (newSpotify) {
    try {
        newSpotify.tracks = this.convertTracksToString(newSpotify.tracks)
        var [rows, fields] = await sql.query("INSERT INTO spotify(client_id,area_id,tracks) VALUES (?,?,?)", [newSpotify.client_id, newSpotify.area_id, newSpotify.tracks])
        if (rows.affectedRows == 0) {
            throw('Error trying to create a spotify tracks data')
        }
        newSpotify.id = rows.insertId
        return newSpotify
    } catch (err) {
        throw err
    }
}

/**
 * Update a tracks valud inside the spotify by his id table
 * 
 * @param {number} id - The id of the data
 * @param {string} tracks - The new tracks
 * @throws
 * @returns {JSON} - With a message field
 */
SpotifyModel.updateTracks = async function (id, tracks) {
    try {
        tracks = this.convertTracksToString(tracks)
        const [rows, fields] = await sql.query("UPDATE spotify SET tracks = ? WHERE id = ?", [tracks, id])
        if (rows.affectedRows == 0) {
            throw Error("cannot update tracks " + id)
        }
        return ({message: 'updated'})
    } catch (err) {
        // console.log(err);
        throw err
    }
}

/**
 * Delete a spotify tracks from the db
 * 
 * @param {number} id - Id of the timer
 * @throws
 */
SpotifyModel.deleteById = async function (id) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM spotify WHERE id = ?", [id])
        if (rows.affectedRows < 1) {
            throw new Error("not_found " + id)
        }
        return {message: 'Tracks deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
}

/**
 * Delete a spotify tracks from the db
 * 
 * @param {number} clientId - Id of the tracks
 * @param {number} areaId - Id of the area
 * @throws
 */
SpotifyModel.deleteByClientAndAreaId = async function (clientId, areaId) {
    try {
        const [rows, fields] = await sql.query("DELETE FROM spotify WHERE client_id = ? AND area_id = ?", [clientId, areaId])
        if (rows.affectedRows < 1) {
            throw new Error("not_found " + areaId)
        }
        return {message: 'Tracks deleted'}
    } catch (err) {
        // console.log(err)
        throw err
    }
}

/**
 * Get all the spotify tracks from the db
 * 
 * @returns {Array.<SpotifyModel>} - Array of spotifModel
 * @throws
 */
SpotifyModel.getAll = async function () {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM spotify")
        if (rows.length < 1) {
            return null
        }
        return rows
    } catch (err) {
        // console.log(err)
        throw err
    }
}

module.exports = SpotifyModel