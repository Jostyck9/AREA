
exports.TWITTER_CONFIG = {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/twitter/callback',
}

exports.GITHUB_CONFIG = {
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/github/callback',
}

exports.SPOTIFY_CONFIG = {
    clientID: process.env.SPOTIFY_KEY,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/spotify/callback',
}

exports.DROPBOX_CONFIG = {
    apiVersion: '2',
    clientID: process.env.DROPBOX_KEY,
    clientSecret: process.env.DROPBOX_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/dropbox/callback'
}