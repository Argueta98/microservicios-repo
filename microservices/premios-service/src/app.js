const express = require('express');

const routes = require('../routes/premios');

const app = express();

app.use('/api/v2/premios', routes);

module.exports = app;
