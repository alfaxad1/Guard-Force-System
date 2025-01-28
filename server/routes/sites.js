const express = require("express");

const router = express.Router();

const pool = require("../config/dbConnection");

//get all sites
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Sites";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get a site by id
router.get("/:SiteID", async (req, res) => {
  try {
    const { SiteID } = req.params;
    const sql = "SELECT * FROM Sites WHERE SiteID = ?";
    const [result] = await pool.query(sql, [SiteID]);

    if (!result || result.length === 0) {
      res.status(404).json({ message: "Site not found" });
    }
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
//create a site
router.post("/", async (req, res) => {
  const { ClientID, LocationName, Address } = req.body;

  const sql =
    "INSERT INTO Sites (ClientID, LocationName, Address ) VALUES (?, ?, ?)";
  const [result] = await pool.query(sql, [ClientID, LocationName, Address]);

  res.status(201).json({ result });
});
//update a site
router.put("/:SiteID", async (req, res) => {
  const { SiteID } = req.params;
  const { ClientID, LocationName, Address } = req.body;
  const sql = "UPDATE Sites SET ? WHERE SiteID = ?";
  const [result] = await pool.query(sql, [req.body, SiteID]);

  res.json({ result });
});

//delete a site
router.delete("/:SiteID", async (req, res) => {
  const { SiteID } = req.params;
  const sql = "DELETE FROM Sites WHERE SiteID = ?";
  const [result] = await pool.query(sql, [SiteID]);

  res.json({ result });
});

module.exports = router;
