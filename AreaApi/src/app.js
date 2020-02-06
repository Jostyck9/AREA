const express = require('express');
const bodyParser = require('body-parser')

const oauthRouter = require('./routers/auth');
const oauth2Router = require('./routers/auth2');
const aboutRouter = require('./routers/about');
const areaRouter = require('./routers/area');
const servicesRouter = require('./routers/services/services');

var cors = require('cors');
const port = process.env.PORT;
require('./db/db');

const populateDb = require('./db/populated.js')
populateDb.populateDB(process.env.MONGODB_URL);



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
        host: 'localhost:8081',
        produces: [
            "application/json",
            "application/xml"
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
app.use(oauth2Router);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(areaRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});