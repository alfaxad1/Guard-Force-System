const express = require("express");

const router = express.Router();

const pool = require("../config/dbConnection");

//get invoices
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Invoices";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get an invoice by id
router.get("/:InvoiceID", async (req, res) => {
  const { InvoiceID } = req.params;
  const sql = "SELECT * FROM Invoices WHERE InvoiceID = ?";
  const [result] = await pool.query(sql, [InvoiceID]);

  if (!result || result.length === 0) {
    res.status(404).json({ message: "Invoice not found" });
  }
  res.json({ result });
});

//create an invoice
router.post("/", async (req, res) => {
  const { ClientID, Amount, DateIssued, Status } = req.body;
  const sql =
    "INSERT INTO Invoices (ClientID, Amount, DateIssued, Status) VALUES (?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    ClientID,
    Amount,
    DateIssued,
    Status,
  ]);

  res.status(201).json({ result });
});

//update an invoice
router.put("/:InvoiceID", async (req, res) => {
  const { InvoiceID } = req.params;
  const { ClientID, Amount, DateIssued, Status } = req.body;
  const sql = "UPDATE Invoices SET ? WHERE InvoiceID = ?";
  const [result] = await pool.query(sql, [req.body, InvoiceID]);

  res.json({ result });
});

//delete an invoice
router.delete("/:InvoiceID", async (req, res) => {
  const { InvoiceID } = req.params;
  const sql = "DELETE FROM Invoices WHERE InvoiceID = ?";
  const [result] = await pool.query(sql, [InvoiceID]);

  res.json({ result });
});

module.exports = router;
