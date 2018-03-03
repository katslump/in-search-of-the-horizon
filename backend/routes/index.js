// Importing needed npm packages
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

var app = express();

// Set up bodyparser to enable access to POST key values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import TodoItem model
var User = require('../models/User.js');

module.exports = app;
