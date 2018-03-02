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

// Enables the end user to create a new todo item in the database
app.post('/register', (req, res) => {
  const newUser= new User({
    email: req.body.email,
    password: req.body.password,
    f_name: req.body.fname,
    l_name: req.body.lname
  });

  newTodo.save().then(response => {
      console.log(response);
    res.send(response);
  }).catch(error => {
    res.send(error);
  })
});

// Enables the end user to grab all todo items in the database
// app.get('/login', (req, res) => {
//   User.find().catch(error => {
//     res.send(error);
//   }).then(response => {
//       console.log(response);
//     res.send({users: response});
//   })
// });



module.exports = app;
