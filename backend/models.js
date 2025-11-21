const pool = require("./db");

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS organisations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      org_id INT REFERENCES organisations(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      org_id INT REFERENCES organisations(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS employee_teams (
      id SERIAL PRIMARY KEY,
      emp_id INT REFERENCES employees(id),
      team_id INT REFERENCES teams(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      log TEXT,
      created TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Tables Ready.");
}

module.exports = { init };
