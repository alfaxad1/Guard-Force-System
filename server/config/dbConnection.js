const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "ogesa",
    password: "ogesa123",
    database: "guard_force",
  })
  .promise();

module.exports = pool;
