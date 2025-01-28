const express = require("express");

const router = express.Router();

const pool = require("../config/dbConnection");

//get guards leave records
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM GuardLeaveRecords";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get a guard leave record by id
router.get("/:LeaveID", async (req, res) => {
  try {
    const { LeaveID } = req.params;
    const sql = "SELECT * FROM GuardLeaveRecords WHERE LeaveID = ?";
    const [result] = await pool.query(sql, [LeaveID]);

    if (!result || result.length === 0) {
      res.status(404).json({ message: "Guard leave record not found" });
    }
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//create a guard leave record
router.post("/", async (req, res) => {
  const {
    GuardID,
    LeaveType,
    StartDate,
    EndDate,
    Reason,
    Status,
    routerrovedBy,
  } = req.body;

  const sql =
    "INSERT INTO GuardLeaveRecords (GuardID,LeaveType,StartDate,EndDate,Reason,Status,routerrovedBy) VALUES (?, ?, ?, ?, ?,?,?,?)";
  const [result] = await pool.query(sql, [
    GuardID,
    LeaveType,
    StartDate,
    EndDate,
    Reason,
    Status,
    routerrovedBy,
  ]);

  res.status(201).json({ result });
});

//update a guard leave record
router.put("/:LeaveID", async (req, res) => {
  const { LeaveID } = req.params;
  const {
    GuardID,
    LeaveType,
    StartDate,
    EndDate,
    Reason,
    Status,
    routerrovedBy,
  } = req.body;
  const sql = "UPDATE GuardLeaveRecords SET ? WHERE LeaveID = ?";
  const [result] = await pool.query(sql, [req.body, LeaveID]);

  res.json({ result });
});

//delete a guard leave record
router.delete("/:LeaveID", async (req, res) => {
  const { LeaveID } = req.params;
  const sql = "DELETE FROM GuardLeaveRecords WHERE LeaveID = ?";
  const [result] = await pool.query(sql, [LeaveID]);

  res.json({ result });
});

module.exports = router;
