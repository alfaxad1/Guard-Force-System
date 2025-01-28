const express = require("express");

const app = express();

app.use(express.json());

const guards = require("./routes/guards");
const users = require("./routes/users");
const clients = require("./routes/clients");
const sites = require("./routes/sites");
const leaves = require("./routes/leaves");
const schedules = require("./routes/schedules");
const incidents = require("./routes/incidents");
const invoices = require("./routes/invoices");

app.use("/guards", guards);
app.use("/users", users);
app.use("/clients", clients);
app.use("/sites", sites);
app.use("/leaves", leaves);
app.use("/schedules", schedules);
app.use("/incidents", incidents);
app.use("/invoices", invoices);

module.exports = app;
