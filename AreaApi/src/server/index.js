const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const session = require('express-session')
const socketio = require('socket.io')
const http = require('http')
const passport = require('passport')

const passportInit = require('./passport.init')


// NOTE ROUTERS
const oauthRouter = require('../routers/auth.router');
const aboutRouter = require('../routers/about.router');
const areaRouter = require('../routers/area.router');
const servicesRouter = require('../routers/services.router');
const userRouter = require('../routers/me.router')

// NOTE SERVICES
const MailController = require('../controllers/nodemailer.controller')
const SpotifyController = require('../controllers/spotify.controller')
const DropBoxController = require('../controllers/dropbox.controller')
const TwitterController = require('../controllers/twitter.controller')
const DiscordController = require('../controllers/discord.controller')
const GithubController = require('../controllers/github.controller')
const TimerController = require('../controllers/timer.contoller')
const ArrayController = [MailController, SpotifyController, DropBoxController, TwitterController, DiscordController, GithubController, TimerController]


const app = express()
const server = http.createServer(app)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());
app.use(passport.initialize())
// app.use(passport.session())
passportInit()

app.set('trust proxy', true);

const io = socketio(server)
app.set('io', io)

app.use(session({
    secret: 'KeyboardKittens',
    name: 'id',
    cookie: { secure: true },
    resave: true,
    saveUninitialized: true
}))

app.use(oauthRouter);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(areaRouter);
app.use(userRouter);
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Area api. To see documentation go to /api-docs" });
});

for (const element of ArrayController) {
    element.init(app)
}

module.exports = app;