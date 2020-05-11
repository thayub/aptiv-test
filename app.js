const express = require('express');
const initialConfig = require('./config/config.js');
const routes = require('./app/routes');
const helpers = require('./app/services/default');
const cors = require('cors');

var swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./docs/swagger.json');
var morgan = require('morgan');
var winston = require('winston');


const bodyParser = require('body-parser');


// Initializing the app
const app = express();

helpers.initialProcessData(initialConfig);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());


// Adding routes
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
