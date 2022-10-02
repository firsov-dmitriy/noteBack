const Pool = require("pg").Pool;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
