const express = require('express');
const bodyParser = require('body-parser')

const oauthRouter = require('../routers/auth.router');
const aboutRouter = require('../routers/about.router');
const areaRouter = require('../routers/area.router');
const servicesRouter = require('../routers/services.router');
const userRouter = require('../routers/me.router')

var cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

app.use(oauthRouter);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(areaRouter);
app.use(userRouter);

app.set('trust proxy', true);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Area api. To see documentation go to /api-docs" });
});

module.exports = app;