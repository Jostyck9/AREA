const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: GithubStrategy } = require('passport-github2')
const { Strategy: SpotifyStrategy } = require('passport-spotify')
const { Strategy: DropboxOAuth2Strategy } = require('passport-dropbox-oauth2')
// const { Strategy: FacebookStrategy } = require('passport-facebook')
const {
    TWITTER_CONFIG, GITHUB_CONFIG, SPOTIFY_CONFIG, DROPBOX_CONFIG, FACEBOOK_CONFIG
} = require('./config')

module.exports = () => {

    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))

    const callback = (accessToken, refreshToken, profile, cb) => cb(null, {profile: profile, accessToken: accessToken, refreshToken: refreshToken})
    const callbackSpotify = (accessToken, refreshToken, expiresIn, profile, done) => done(null, {profile: profile, accessToken: accessToken, refreshToken: refreshToken, expiresIn: expiresIn})
    const callbackTwitter = (token, tokenSecret, profile, cb) => cb(null, {profile: profile, accessToken: token, tokenSecret: tokenSecret})

    // Adding each OAuth provider's strategy to passport
    passport.use(new TwitterStrategy(TWITTER_CONFIG, callbackTwitter))
    passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
    passport.use(new SpotifyStrategy(SPOTIFY_CONFIG, callbackSpotify))
    passport.use(new DropboxOAuth2Strategy(DROPBOX_CONFIG, callback))
    // passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
}