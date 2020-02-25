const app = require('./server')
const bodyParser = require('body-parser')
const port = process.env.PORT;

// swagger
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:8080',
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
app.use(bodyParser.json());

require('./controllers/twitter.controller').init_twitter(app)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});