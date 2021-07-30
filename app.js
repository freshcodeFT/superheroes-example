const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { STATIC_PATH } = require('./config/config');
const errorHandler = require('./middlewares/error.handlers.mw');

const app = express();
app.use(cors());
app.use(express.static(STATIC_PATH));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

module.exports = app;
