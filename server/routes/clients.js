const express = require("express");

const router = express.Router();

const pool = require("../config/dbConnection");

//get all clients
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Clients";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get a client by id
router.get("/:ClientID", async (req, res) => {
  try {
    const { ClientID } = req.params;
    const sql = "SELECT * FROM Clients WHERE ClientID = ?";
    const [result] = await pool.query(sql, [ClientID]);

    if (!result || result.length === 0) {
      res.status(404).json({ message: "Client not found" });
    }
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//register a client
router.post("/", async (req, res) => {
  const { Name, Address, ContactPerson, PhoneNumber, Email } = req.body;

  const sql =
    "INSERT INTO Clients (Name, Address, ContactPerson, PhoneNumber, Email) VALUES (?, ?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    Name,
    Address,
    ContactPerson,
    PhoneNumber,
    Email,
  ]);

  res.status(201).json({ result });
});

//update a client
router.put("/:ClientID", async (req, res) => {
  const { ClientID } = req.params;
  const { Name, Address, ContactPerson, PhoneNumber, Email } = req.body;
  const sql = "UPDATE Clients SET ? WHERE ClientID = ?";
  const [result] = await pool.query(sql, [req.body, ClientID]);

  res.json({ result });
});

//delete a client
router.delete("/:ClientID", async (req, res) => {
  const { ClientID } = req.params;
  const sql = "DELETE FROM Clients WHERE ClientID = ?";
  const [result] = await pool.query(sql, [ClientID]);

  res.json({ result });
});

module.exports = router;
