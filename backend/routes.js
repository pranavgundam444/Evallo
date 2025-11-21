const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const { auth, secret } = require("./auth");
const log = require("./logger");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO organisations (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, hashed]
  );

  res.json(result.rows[0]);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const org = await pool.query("SELECT * FROM organisations WHERE email=$1", [
    email,
  ]);

  if (!org.rows.length) return res.status(404).json({ msg: "Not found" });

  const valid = await bcrypt.compare(password, org.rows[0].password);
  if (!valid) return res.status(403).json({ msg: "Wrong password" });

  const token = jwt.sign({ org_id: org.rows[0].id }, secret);

  log(`[LOGIN] Org ${org.rows[0].id} logged in`);

  res.json({ token });
});


/* EMPLOYEES CRUD */
router.get("/employees", auth, async (req, res) => {
  const emp = await pool.query("SELECT * FROM employees WHERE org_id=$1", [
    req.user.org_id,
  ]);
  res.json(emp.rows);
});

router.post("/employees", auth, async (req, res) => {
  const { name, role } = req.body;

  const result = await pool.query(
    "INSERT INTO employees (name, role, org_id) VALUES ($1,$2,$3) RETURNING *",
    [name, role, req.user.org_id]
  );

  log(`[EMPLOYEE CREATED] Org ${req.user.org_id} added ${result.rows[0].id}`);
  res.json(result.rows[0]);
});

/* TEAMS CRUD */
router.get("/teams", auth, async (req, res) => {
  const t = await pool.query("SELECT * FROM teams WHERE org_id=$1", [
    req.user.org_id,
  ]);
  res.json(t.rows);
});

router.post("/teams", auth, async (req, res) => {
  const { name } = req.body;

  const result = await pool.query(
    "INSERT INTO teams (name, org_id) VALUES ($1,$2) RETURNING *",
    [name, req.user.org_id]
  );

  log(`[TEAM CREATED] Org ${req.user.org_id} created ${result.rows[0].id}`);
  res.json(result.rows[0]);
});

/* ASSIGN EMPLOYEE TO TEAM */
router.post("/assign", auth, async (req, res) => {
  const { emp_id, team_id } = req.body;

  const result = await pool.query(
    "INSERT INTO employee_teams (emp_id, team_id) VALUES ($1,$2) RETURNING *",
    [emp_id, team_id]
  );

  log(`[ASSIGN] Employee ${emp_id} assigned to Team ${team_id}`);

  res.json(result.rows[0]);
});

module.exports = router;
