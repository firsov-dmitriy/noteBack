const Pool = require("pg");

const pool = new Pool.Pool({
  user: "postgres",
  password: "Aa0661103",
  host: "localhost",
  port: 5432,
  database: "note_db",
});

module.exports = pool;
