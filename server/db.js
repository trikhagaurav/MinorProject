const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1174",
  port: 5432,
  database: "minorproject"
});

module.exports = pool;