const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "9871514381",
    host: "localhost",
    port: 5432,
    database: "Minor_Project"
});
module.exports = pool;