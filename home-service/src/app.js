// Importa el módulo express
const express = require("express");

const home = require("../routes/");

const app = express();

app.use("/api/home", home);

module.exports = app;