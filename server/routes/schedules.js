const express = require("express");

const router = express.Router();

const pool = require("../config/dbConnection");

//get schedules
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Schedules";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get a schedule by id
router.get("/:ScheduleID", async (req, res) => {
  const { ScheduleID } = req.params;
  const sql = "SELECT * FROM Schedules WHERE ScheduleID = ?";
  const [result] = await pool.query(sql, [ScheduleID]);

  if (!result || result.length === 0) {
    res.status(404).json({ message: "Schedule not found" });
  }
  res.json({ result });
});
//create a schedule
router.post("/", async (req, res) => {
  const { GuardID, SiteID, ShiftStart, ShiftEnd } = req.body;
  const sql =
    "INSERT INTO Schedules (GuardID, SiteID, ShiftStart, ShiftEnd) VALUES (?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    GuardID,
    SiteID,
    ShiftStart,
    ShiftEnd,
  ]);

  res.status(201).json({ result });
});
//update a schedule
router.put("/:ScheduleID", async (req, res) => {
  const { ScheduleID } = req.params;
  const { GuardID, SiteID, ShiftStart, ShiftEnd } = req.body;
  const sql = "UPDATE Schedules SET ? WHERE ScheduleID = ?";
  const [result] = await pool.query(sql, [req.body, ScheduleID]);

  res.json({ result });
});
//delete a schedule
router.delete("/:ScheduleID", async (req, res) => {
  const { ScheduleID } = req.params;
  const sql = "DELETE FROM Schedules WHERE ScheduleID = ?";
  const [result] = await pool.query(sql, [ScheduleID]);

  res.json({ result });
});

module.exports = router;
