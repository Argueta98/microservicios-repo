const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.use(express.json());

const logger = (message) => console.log(`Todos los datos Services: ${message}`);



module.exports = router; 