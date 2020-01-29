const express = require('express')
// const userRouter = require('./routers/user')
const port = process.env.PORT
// require('./db/db')

const app = express()

// app.use(express.json())
// app.use(userRouter)

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send('Hello world WebClient ! ') // envoi de hello world a l'utilisateur
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})