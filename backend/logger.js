const pool = require("./db");

const log = async (text) => {
  await pool.query("INSERT INTO logs (log) VALUES ($1)", [text]);
};

module.exports = log;
