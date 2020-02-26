
exports.TWITTER_CONFIG = {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/twitter/callback',
}

exports.GITHUB_CONFIG = {
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:8081' + '/auth/github/callback',
}

exports.SPOTIFY_CONFIG = {
    clientID: process.env.SPOTIFY_KEY,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/spotify/callback',
}

exports.TRELLO_CONFIG = {
    consumerKey: process.env.TRELLO_KEY,
    consumerSecret: process.env.TRELLO_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/trello/callback',
    passReqToCallback: true,
    trelloParams: {
        scope: "read,write",
        name: "MyApp",
        expiration: "never"
    }
}

exports.MICROSOFT_CONFIG = {
    clientID: process.env.MICROSOFT_KEY,
    clientSecret: process.env.MICROSOFT_SECRET,
    callbackURL: 'https://areax2.com.ngrok.io/auth/microsoft/callback',
}

exports.DROPBOX_CONFIG = {
    apiVersion: '2',
    clientID: process.env.DROPBOX_KEY,
    clientSecret: process.env.DROPBOX_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/dropbox/callback'
}