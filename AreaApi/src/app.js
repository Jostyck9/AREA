console.log('Starting server...')

const express = require('express');
const bodyParser = require('body-parser')

const oauthRouter = require('./routers/auth.router');
// const oauth2Router = require('./routers/auth2');
const aboutRouter = require('./routers/about.router');
const areaRouter = require('./routers/area.router');
const servicesRouter = require('./routers/services.router');

var cors = require('cors');
const port = process.env.PORT;

const app = express()

// swagger
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: '10.29.124.206:8081',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routers/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

app.use(oauthRouter);
// app.use(oauth2Router);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(areaRouter);

app.set('trust proxy', true);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Area api. To see documentation go to /api-docs" });
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});