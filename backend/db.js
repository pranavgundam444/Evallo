const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // takes care of user, password, host, port, database
  ssl: {
    rejectUnauthorized: false, // required for Render / cloud Postgres
  },
});

module.exports = pool;
