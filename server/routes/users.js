const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const salt = 10;

router.use(express.json());
router.use(cookieParser());

const pool = require("../config/dbConnection");
const validate = require("../models/userModel");

//get users
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM Users";
  const [result] = await pool.query(sql);
  res.json({ result });
});

//get a user by id
router.get("/:UserID", async (req, res) => {
  try {
    const { UserID } = req.params;
    const sql = "SELECT * FROM Users WHERE UserID = ?";
    const [result] = await pool.query(sql, [UserID]);

    if (!result || result.length === 0) {
      res.status(404).json({ message: "User not found" });
    }
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//register a user
router.post("/register", validate, (req, res) => {
  const sql = "INSERT INTO Users (Username, Password, Role) VALUES (?)";
  bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "password hashing error" });
    const values = [req.body.Username, hash, req.body.Role];

    pool.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Error inserting user" });
      return res.status(201).json({ message: "User registered" });
    });
  });
});

//login
router.post("/login", (req, res) => {
  const sql = "SELECT * FROM Users WHERE Username = ?";
  pool.query(sql, [req.body.Username], (result, err) => {
    if (err) return res.json({ Error: "Error logging in" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.Password.toString(),
        result[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password comparison error" });
          if (response) {
            const username = result[0].Username;
            const token = jwt.sign(username, process.env.SECRET_KEY, {
              expiresIn: "1h",
            });
            res.json(token);
            res.cookie("token", token, { httpOnly: true });

            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Incorrect password" });
          }
        }
      );
    } else {
      res.json({ Error: "User not found" });
    }
  });
});

//update a user
router.put("/:UserID", async (req, res) => {
  const { UserID } = req.params;
  const { Username, Password, Role } = req.body;
  const sql = "UPDATE Users SET ? WHERE UserID = ?";
  const [result] = await pool.query(sql, [req.body, UserID]);

  res.json({ result });
});

//delete a user
router.delete("/:UserID", async (req, res) => {
  const { UserID } = req.params;
  const sql = "DELETE FROM Users WHERE UserID = ?";
  const [result] = await pool.query(sql, [UserID]);

  res.json({ result });
});

module.exports = router;
