const SpotifyWebApi = require('spotify-web-api-node');
const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')
const SpotifyModel = require('../models/Spotify.model')
const ServicesTokenModel = require('../models/ServiceTokens.model')
const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')
const AreaController = require('./area.controller')

let idInterval = 0
let INTERVAL = 60000

/**
 * spotify connect the token received to the database
 *
 * @async
 * @param {any} req the request
 * @param {any} res the res
 * @exports
 */
exports.spotify = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('spotify')
        if (!resService)
            throw new Error("Unkown service spotify")

        ServiceAuthController.connect(
            req.userArea.id,
            {
                access_token: req.user.accessToken || null,
                refresh_token: req.user.refresh_token || null,
                secret_token: req.user.tokenSecret || null,
                expires_in: req.user.expiresIn || null,
            },
            resService.id,
            req.urlCallback.url,
            res
        )
        req.session.destroy()
    } catch (err) {
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
}

/**
 * Check if a changement occurs on the tracks from a playlist inside the db, used as an ACTION
 * 
 * @async
 */
async function checkPlaylistUpdate() {
    if (idInterval) {
        clearInterval(idInterval)
    }
    idInterval = setInterval(async function () {
        try {
            const resAction = await ActionModel.findByName('playlist_modified')
            if (!resAction) {
                console.error('Action playlist_modified not found')
                clearInterval(idInterval)
                idInterval = 0
                return
            }

            const allTracks = await SpotifyModel.getAll()
            if (allTracks) {
                allTracks.forEach(async (element) => {
                    try {
                        const accessToken = await getClientSpotifyToken(element.client_id)
                        if (!accessToken)
                            return

                        var areaRes = await AreaModel.findById(element.client_id, element.area_id)
                        if (!areaRes)
                            return

                        var newTracks = await getPlaylistTracks(areaRes.parameters_action.playlistId, accessToken, true)
                        if (newTracks !== element.tracks) {
                            const name = await getPlaylistName(areaRes.parameters_action.playlistId, accessToken)
                            await SpotifyModel.updateTracks(element.id, SpotifyModel.convertTracksToArray(newTracks))
                            await AreaController.SendToReactionById(areaRes, resAction.id, { message: foundChangementTracks(element.tracks, newTracks, name) })
                        }
                    } catch (errorFor) {
                        console.log(errorFor)
                    }
                });
            }
        } catch (err) {
            console.error(err.message)
        }
    }, INTERVAL);
}

/**
 * Start the music on the user's device, use as REACTION
 * 
 * @async
 * @param {string} accessToken - Spotify's access token
 * @param {string} name - Name of the spotify music
 */
async function startMusic(accessToken, name) {
    try {
        var spotifyApi = new SpotifyWebApi({ accessToken: accessToken });

        spotifyApi.searchTracks(name).then(
            function (data) {
                // data.body.tracks.items[0].uri
                console.log(data.body.tracks.items[0].uri)

                spotifyApi.play({ uris: [data.body.tracks.items[0].uri] }).then(function (data) {
                },
                    function (error) {
                        console.log(error)
                    })
            },
            function (error) {
                console.log(error)
            }
        )
    } catch (err) {
        console.error(err.message)
    }
}

/**
 * Pause the music on th euser's device, used as REACTION
 * 
 * @async
 * @param {string} accessToken - Spotify's access token
 */
async function pauseMusic(accessToken) {
    try {
        var spotifyApi = new SpotifyWebApi({ accessToken: accessToken });
        spotifyApi.pause().then(function (data) {
        }, function (error) {
            console.log(error)
        })
    } catch (err) {
        console.error(err.message)
    }
}

/**
 * Add a music inside a playlist, if not existing, creating the playlist
 * 
 * @async
 * @param {string} accessToken - Spotify's access token
 * @param {string} music - The music's name to add
 * @param {string} playlist - The playlist's name
 */
async function setMusicPlaylist(accessToken, music, playlist) {
    try {
        var spotifyApi = new SpotifyWebApi({ accessToken: accessToken });
        var musicUri = null
        var playlistId = null
        var userId = null

        //search the music track
        spotifyApi.searchTracks(music).then(
            function (musics) {
                if (musics.body.tracks.items.length == 0)
                    return
                musicUri = musics.body.tracks.items[0].uri

                //user info
                spotifyApi.getMe().then(
                    function (resUser) {
                        userId = resUser.body.id
                        if (!userId)
                            return

                        //Search the playlist
                        spotifyApi.getUserPlaylists({ limit: 50, offset: 0 }).then(
                            function (data) {
                                data.body.items.forEach(element => {
                                    if (element.name == playlist) {
                                        playlistId = element.id
                                        console.log(element.name)
                                    }
                                });
                                if (!playlistId) {

                                    //create playlist
                                    spotifyApi.createPlaylist(userId, playlist, { public: false }).then(
                                        function (playlistRes) {
                                            playlistId = playlistRes.body.id

                                            //add music
                                            spotifyApi.addTracksToPlaylist(playlistId, [musicUri])
                                        },
                                        function (errPlaylist) { console.log(errPlaylist.message) }
                                    )
                                } else {

                                    //add music
                                    spotifyApi.addTracksToPlaylist(playlistId, [musicUri])
                                }
                            },
                            function (error) { console.log(error.message) }
                        )
                    },
                    function (errUser) { console.log(errUser.message) }
                )
            },
            function (err) { console.log("music:", err.message) }
        )
    } catch (err) {
        console.error(err.message)
    }
}

//NOTE ======================^^ ACTION /  REACTIONS ^^=================================================

/**
 * Compare the the two lost of tracks and returns a message describing the difference
 * 
 * @param {string} oldTracks - List of tracks separated by semciolon
 * @param {string} newTracks - List of tracks separated by semciolon
 * @param {string} playlistName - Playlist's name
 * @returns {string} - Message
 */
function foundChangementTracks(oldTracks, newTracks, playlistName) {
    const arrayOld = SpotifyModel.convertTracksToArray(oldTracks)
    const arrayNew = SpotifyModel.convertTracksToArray(newTracks)
    const deleted = []
    const added = []
    var message = "Your playlist '" + playlistName + "' has changed !\n"

    try {
        arrayOld.forEach(element => {
            if (!arrayNew.includes(element)) {
                deleted.push(element)
            }
        });
        arrayNew.forEach(element => {
            if (!arrayOld.includes(element)) {
                added.push(element)
            }
        })
        if (deleted.length > 0) {
            message += "Deleted:\n"
            deleted.forEach(element => {
                message += "- " + element + "\n"
            });
        }
        if (added.length > 0) {
            message += "Added:\n"
            added.forEach(element => {
                message += "- " + element + "\n"
            });
        }
    } catch (err) {
        console.log(err)
    }
    return message
}

/**
 * Get the name of a playlist by his id / uri:id
 * 
 * @async
 * @param {string} playlistId - The playlist's id
 * @param {string} accessToken - The user's access tokken
 * @returns {string} - Playlist's Name, can be null
 */
async function getPlaylistName(playlistId, accessToken) {
    var spotifyApi = new SpotifyWebApi({ accessToken: accessToken });
    playlistId = playlistId.replace("spotify:playlist:", "")

    return await spotifyApi.getPlaylist(playlistId, { fields: 'name' }).then(function (data) {
        return data.body.name
    },
        function (err) {
            return null
        })
}

/**
 * Get the access token of the client for spotify 
 * 
 * @async
 * @param {number} client_id
 * @returns {string} - Access token
 * @throws
 */
async function getClientSpotifyToken(client_id) {
    const service = await ServiceModel.findByName('spotify')
    if (!service) {
        throw new Error()
    }
    const res = await ServicesTokenModel.findByServiceAndClientId(service.id, client_id);
    return res.access_token;
}

/**
 * Get the playlist tracks
 * @param {string} playlistId - Playlist's id
 * @param {string} accessToken - The user's access token
 * @param {boolean} toString - Boolean to convert the array in an only one string, DEFAULT = FALSE
 * @throws
 */
async function getPlaylistTracks(playlistId, accessToken, toString = false) {
    var spotifyApi = new SpotifyWebApi({ accessToken: accessToken });
    var res = []
    var resString = ""
    var tracks = { next: 'hey' }
    var offset = 0
    playlistId = playlistId.replace("spotify:playlist:", "")
    while (tracks.next) {
        tracks = await spotifyApi.getPlaylistTracks(playlistId, { offset: offset }).then(function (data) {
            return data.body
        },
            function (error) {
                console.log(error)
                throw (error)
            }
        )
        if (toString) {
            tracks.items.forEach(element => {
                if (resString !== "") {
                    resString += ";"
                }
                resString += element.track.name
            });
        } else {
            tracks.items.forEach(element => {
                res.push(element.track.name)
            });
        }
        offset += 100
    }
    if (toString)
        return resString
    return res
}

/**
 * Create specific data for the area (for exemple init a timer for this area)
 * @param {JSON} area - The area created
 */
exports.createArea = async (area) => {
    try {
        //TODO check if the user is connected BEFORE to the service
        if (!area.parameters_action.playlistId)
            return

        const access_token = await getClientSpotifyToken(area.client_id)
        const tracks = await getPlaylistTracks(area.parameters_action.playlistId, access_token)
        var newTracks = new SpotifyModel({
            client_id: area.client_id,
            area_id: area.id,
            tracks: tracks
        })
        SpotifyModel.create(newTracks)
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Delete the area (specific for each service (for exemple , delete the timer inthe time table))
 * 
 * @param {JSON} - area
 */
exports.deleteArea = async (area) => {
    try {
        SpotifyModel.deleteByClientAndAreaId(area.client_id, area.id)
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Call the appropriate reaction from area of the service
 * 
 * @param {JSON} actionResult - The result of the action triggered
 * @param {JSON} area - The area to use
 */
exports.useReaction = async (actionResult, area) => {
    try {
        const reaction = await ReactionModel.findById(area.reaction_id)
        if (!reaction)
            throw ("No reaction found for spotify")
        const token = await getClientSpotifyToken(area.client_id)
        switch (reaction.name) {
            case "add_music":
                setMusicPlaylist(token, area.parameters_reaction.music, area.parameters_reaction.playlist)
                break;
            case "play_music":
                startMusic(token, area.parameters_reaction.music)
                break;
            case "pause_music":
                pauseMusic(token)
                break;
            default:
                break;
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * Init all the timers of the Service
 * 
 * @param {Express} app server express
 */
exports.init = async (app) => {
    checkPlaylistUpdate()
}