const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: GithubStrategy } = require('passport-github')
const { Strategy: TrelloStrategy } = require('passport-trello')
const { Strategy: SpotifyStrategy } = require('passport-spotify')
const { Strategy: MicrosoftStrategy } = require('passport-azure-ad-oauth2')
const { Strategy: DropboxOAuth2Strategy } = require('passport-dropbox-oauth2')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const {
    TWITTER_CONFIG, GITHUB_CONFIG, TRELLO_CONFIG, SPOTIFY_CONFIG, MICROSOFT_CONFIG, DROPBOX_CONFIG, FACEBOOK_CONFIG
} = require('./config')

module.exports = () => {

    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))

    // The callback that is invoked when an OAuth provider sends back user 
    // information. Normally, you would save the user to the database 
    // in this callback and it would be customized for each provider
    const callback = (accessToken, refreshToken, profile, cb) => cb(null, {profile: profile, accessToken: accessToken, refreshToken: refreshToken})
    const callbackTrello = (req, token, tokenSecret, profile, done) => done(null, profile)
    const callbackMicrosoft = (accessToken, refresh_token, params, profile, done) => done(null, profile)
    const callbackSpotify = (accessToken, refreshToken, expires_in, profile, done) => done(null, profile)

    // Adding each OAuth provider's strategy to passport
    passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
    passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
    passport.use(new SpotifyStrategy(SPOTIFY_CONFIG, callbackSpotify))
    passport.use(new TrelloStrategy(TRELLO_CONFIG, callbackTrello))
    passport.use(new DropboxOAuth2Strategy(DROPBOX_CONFIG, callback))
    passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
    passport.use(new MicrosoftStrategy(MICROSOFT_CONFIG, callbackMicrosoft))
}