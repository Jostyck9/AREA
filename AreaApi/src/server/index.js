const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const session = require('express-session')
const socketio = require('socket.io')
const http = require('http')
const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')

const oauthRouter = require('../routers/auth.router');
const aboutRouter = require('../routers/about.router');
const areaRouter = require('../routers/area.router');
const servicesRouter = require('../routers/services.router');
const userRouter = require('../routers/me.router')

const TWITTER_CONFIG = {
    consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
    consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
    // make sure the callbackUrl matches what was set on Twitter
    // when registering the app
    callbackURL: 'http://areax2.com.ngrok.io/auth/twitter/callback'
}

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());
app.use(passport.initialize())

app.use(oauthRouter);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(areaRouter);
app.use(userRouter);

app.set('trust proxy', true);

app.use(session({
    secret: 'KeyboardKittens',
    name: 'id',
    cookie : { secure: false },
    resave: true,
    saveUninitialized: true
}))

// allows us to save the user into the session
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// Basic setup with passport and Twitter
passport.use(new TwitterStrategy(
    TWITTER_CONFIG,
    (accessToken, refreshToken, profile, cb) => {

        // save the user right here to a database if you want
        const user = {
            name: profile.username,
            photo: profile.photos[0].value.replace(/_normal/, '')
        }
        console.log(user.name)
        cb(null, user)
    })
)

// Middleware that triggers the PassportJS authentication process
const twitterAuth = passport.authenticate('twitter')

// This custom middleware picks off the socket id (that was put on req.query)
// and stores it in the session so we can send back the right info to the 
// right socket
const addSocketIdToSession = (req, res, next) => {
    console.log('try to connect')
    // req.session.socketId = req.query.socketId
    req.session.token = req.query.token
    next()
}

// This is endpoint triggered by the popup on the client which starts the whole
// authentication process
app.get('/auth/twitter', addSocketIdToSession, twitterAuth)

// This is the endpoint that Twitter sends the user information to. 
// The twitterAuth middleware attaches the user to req.user and then
// the user info is sent to the client via the socket id that is in the 
// session. 
app.get('/auth/twitter/callback', twitterAuth, (req, res) => {
    console.log(req.query.oauth_token)
    io.in(req.session.socketId).emit('user', req.user)
    res.send({token_twitter: req.query.oauth_token, token: req.session.token})
    req.session.destroy();
})

app.get('/test', (req, res) => {
    res.send({token: req.session.token})
})

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Area api. To see documentation go to /api-docs" });
});

module.exports = app;