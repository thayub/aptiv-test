const express = require('express');
const initialConfig = require('./config/config.js');
const routes = require('./app/routes');

const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initializing the app
const app = express();


app.use(morgan('short'));
app.use('/api', routes);


module.exports = app;
