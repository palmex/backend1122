const Pool = require('pg').Pool
const dotenv = require('dotenv')

dotenv.config()


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: process.env.DB_PORT
    // user: 'postgres',
    // host: 'localhost',
    // port: '5432',
    // password: 'PosgresRocks123!',
    // database: 'stellantis'
})

module.exports = pool;