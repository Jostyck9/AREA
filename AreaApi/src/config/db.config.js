let db_name = "area"

if (process.env.NODE_ENV === 'test') {
    db_name = process.env.DB_TEST
}

module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: db_name || "area"
  };