const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { db } = require("./startup/db.js");
const { routes } = require("./startup/routes.js");

const app = express();

db();
routes(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
