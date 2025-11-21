const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Pranav123",
  host: "localhost",
  port: 5432,
  database: "hrms"
});

module.exports = pool;
