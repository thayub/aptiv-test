const express = require('express');
const initialConfig = require('./config/config.js');
const routes = require('./app/routes');
const helpers = require('./app/services/default');
var swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');


const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initializing the app
const app = express();

helpers.initialProcessData(initialConfig);
// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('short'));
// Adding routes
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
