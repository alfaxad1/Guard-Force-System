const express = require("express");

const pool = require("../config/dbConnection");
const validate = require("../models/guardModel");

const router = express.Router();

//get all guards
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Guards";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get a guard by id
router.get("/:GuardID", async (req, res) => {
  try {
    const { GuardID } = req.params;
    const sql = "SELECT * FROM Guards WHERE GuardID = ?";
    const [result] = await pool.query(sql, [GuardID]);

    if (!result || result.length === 0) {
      res.status(404).json({ message: "Guard not found" });
    }
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//register a guard
router.post("/", validate, async (req, res) => {
  const { Name, PhoneNumber, Address, AssignedSiteID, Salary, Status } =
    req.body;

  const sql =
    "INSERT INTO Guards (Name, PhoneNumber, Address, AssignedSiteID, Salary, Status) VALUES (?, ?, ?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    Name,
    PhoneNumber,
    Address,
    AssignedSiteID,
    Salary,
    Status,
  ]);

  res.status(201).json({ result });
});

//update a guard
router.put("/:GuardID", validate, async (req, res) => {
  const { GuardID } = req.params;
  const { Name, PhoneNumber, Address, AssignedSiteID, Salary, Status } =
    req.body;
  const sql = "UPDATE Guards SET ? WHERE GuardID = ?";
  const [result] = await pool.query(sql, [req.body, GuardID]);

  res.json({ result });
});

//delete a guard
router.delete("/:GuardID", async (req, res) => {
  const { GuardID } = req.params;
  const sql = "DELETE FROM Guards WHERE GuardID = ?";
  const [result] = await pool.query(sql, [GuardID]);

  res.json({ result });
});

module.exports = router;
