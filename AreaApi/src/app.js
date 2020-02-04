const express = require('express')
const userRouter = require('./routers/auth')
const aboutRouter = require('./routers/about')
var cors = require('cors');
const port = process.env.PORT
require('./db/db')

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
expressSwagger(options)

app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(aboutRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})