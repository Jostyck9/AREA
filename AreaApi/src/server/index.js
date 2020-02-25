const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const session = require('express-session')
const socketio = require('socket.io')
const http = require('http')
const passport = require('passport')

const passportInit = require('./passport.init')

const oauthRouter = require('../routers/auth.router');
const aboutRouter = require('../routers/about.router');
const areaRouter = require('../routers/area.router');
const servicesRouter = require('../routers/services.router');
const userRouter = require('../routers/me.router')

const app = express()
const server = http.createServer(app)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());
app.use(passport.initialize())
passportInit()

app.set('trust proxy', true);

const io = socketio(server)
app.set('io', io)

app.use(session({
    secret: 'KeyboardKittens',
    name: 'id',
    cookie : { secure: false },
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

module.exports = app;