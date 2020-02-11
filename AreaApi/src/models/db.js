// const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

// MYSQL BELOW

const dbConfig = require("../config/db.config.js");
const mysql = require('mysql2/promise');

// Create a connection to the database
// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
//     port: 3306
// });

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// open the MySQL connection
// connection.connect(error => {
//     if (error) {
//         throw error
//     }

//     console.log("Successfully connected to the database.");
// });

module.exports = pool;