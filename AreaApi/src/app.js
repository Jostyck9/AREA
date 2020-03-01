const app = require('./server')
const port = process.env.PORT || 8080;

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});