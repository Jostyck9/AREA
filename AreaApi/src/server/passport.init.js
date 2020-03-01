const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: GithubStrategy } = require('passport-github2')
const { Strategy: SpotifyStrategy } = require('passport-spotify')
const { Strategy: DropboxOAuth2Strategy } = require('passport-dropbox-oauth2')
// const { Strategy: FacebookStrategy } = require('passport-facebook')
const {
    TWITTER_CONFIG, GITHUB_CONFIG, SPOTIFY_CONFIG, DROPBOX_CONFIG
} = require('../config/config')

module.exports = () => {

    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))

    const callback = (accessToken, refreshToken, profile, cb) => cb(null, {profile: profile, accessToken: accessToken, refreshToken: refreshToken})
    const callbackSpotify = (accessToken, refreshToken, expiresIn, profile, done) => done(null, {profile: profile, accessToken: accessToken, refreshToken: refreshToken, expiresIn: expiresIn})
    const callbackTwitter = (token, tokenSecret, profile, cb) => cb(null, {profile: profile, accessToken: token, tokenSecret: tokenSecret})

    // Adding each OAuth provider's strategy to passport
    if (TWITTER_CONFIG.consumerKey && TWITTER_CONFIG.consumerSecret) {
        passport.use(new TwitterStrategy(TWITTER_CONFIG, callbackTwitter))
    } else {
        console.error('Missing twitter keys in .env')
    }
    if (GITHUB_CONFIG.clientID && GITHUB_CONFIG.clientSecret) {
        passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
    } else {
        console.error('Missing github keys in .env')
    }
    if (SPOTIFY_CONFIG.clientID && SPOTIFY_CONFIG.clientSecret) {
        passport.use(new SpotifyStrategy(SPOTIFY_CONFIG, callbackSpotify))
    } else {
        console.error('Missing spotify keys in .env')
    }
    if (DROPBOX_CONFIG.clientID && DROPBOX_CONFIG.clientSecret) {
        passport.use(new DropboxOAuth2Strategy(DROPBOX_CONFIG, callback))
    } else {
        console.error('Missing dropbox keys in .env')
    }
}