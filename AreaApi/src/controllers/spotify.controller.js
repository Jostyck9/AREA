var SpotifyWebApi = require('spotify-web-api-node');
const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')

/**
 * spotify connect the token received to the database
 *
 * @param {any} req the request
 * @param {any} res the res
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


// TODO REMOVE HERE !
exports.spotifyNewMusic = async function (area, action_result) {
    return false;
}

// NOTE Reaction
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

// NOTE Reaction
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

// NOTE Reaction
async function setMusicPlaylist(accessToken, music, playlist) {
    try {
        var spotifyApi = new SpotifyWebApi({ accessToken: accessToken });
        var musicUri = null
        var playlistId = null
        var userId = null

        console.log('try')
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

//NOTE =======================================================================

/**
 * Create specific data for the area (for exemple init a timer for this area)
 */
exports.createArea = async (area) => {
    try {
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
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Call the appropriate reaction from area of the service
 * 
 * @param {JSON} actionResult - 
 */
exports.useReaction = async (actionResult, area) => {
}

/**
 * Init all the timers of the Service
 * 
 * @param {Express} app server express
 */
exports.init = async (app) => {
}