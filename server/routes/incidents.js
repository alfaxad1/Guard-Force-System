const express = require("express");

const router = express.Router();

const pool = require("../config/dbConnection");

//get incidents
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Incidents";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get an incident by id
router.get("/:IncidentID", async (req, res) => {
  const { IncidentID } = req.params;
  const sql = "SELECT * FROM Incidents WHERE IncidentID = ?";
  const [result] = await pool.query(sql, [IncidentID]); // pass the id as a parameter

  if (!result || result.length === 0) {
    res.status(404).json({ message: "Incident not found" });
  }
});

//create an incident
router.post("/", async (req, res) => {
  const { SiteID, GuardID, Desription, DateReported, Status } = req.body;
  const sql =
    "INSERT INTO Incidents (SiteID, GuardID, Desription, DateReported, Status) VALUES (?, ?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    SiteID,
    GuardID,
    Desription,
    DateReported,
    Status,
  ]);

  res.status(201).json({ result });
});

//update an incident
router.put("/:IncidentID", async (req, res) => {
  const { IncidentID } = req.params;
  const { SiteID, GuardID, Desription, DateReported, Status } = req.body;
  const sql = "UPDATE Incidents SET ? WHERE IncidentID = ?";
  const [result] = await pool.query(sql, [req.body, IncidentID]);

  res.json({ result });
});

//delete an incident
router.delete("/:IncidentID", async (req, res) => {
  const { IncidentID } = req.params;
  const sql = "DELETE FROM Incidents WHERE IncidentID = ?";
  const [result] = await pool.query(sql, [IncidentID]);

  res.json({ result });
});

module.exports = router;
