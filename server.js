// Imports 
var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;

// Config routes
var routes = require('./routes/routes');
routes.assignRoutes(app);

// Launch server
app.listen(PORT);

