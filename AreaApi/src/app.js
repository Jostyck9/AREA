const https = require('https')
const fs = require('fs')
const bodyParser = require ('body-parser');
const app = require('./server')
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
        schemes: ['https'],
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
const server = https.createServer({
	key: fs.readFileSync('./src/key.pem'),
	cert: fs.readFileSync('./src/cert.pem')
}, app);

require('./controllers/twitter.controller').init_twitter(app)

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
