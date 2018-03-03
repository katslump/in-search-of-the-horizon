import express from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import mongoose from 'mongoose';
import routes from './routes/index';
import bodyParser from 'body-parser';

// Import models
import User from './models/User.js';

// Set port
var port = parseInt(process.env.PORT) || 3000;

if (! fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}

// Checks for database connection string in env.sh
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}

// When successfully connected to db
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});

// If the connection throws an error when connecting to db
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

// Creates database connection
mongoose.connect(process.env.MONGODB_URI);

// Initialize http server
const app = express();

// Configure API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure database endpoint pathes
// app.use('/', routes);



app.get('/', (req, res) => {
  res.json({ message: "Welcome to the home page!" })
  }
);

// Enables the end user to grab all todo items in the database
app.get('/users', (req, res) => {
  User.find().catch(error => {
      res.json({ error: error})
  }).then(response => {
    res.json({users: response});
  })
});

app.get('/login', (req,res) => {
  console.log(req.query.email, req.query.password)
  User.find({email:req.query.email, password:req.query.password}, function(error, results) {
    if(error) {
      res.status(400).send('error in finding email')
    } else {
      res.json(results)
    }
  })
})

app.post('/register', (req, res) => {
  // console.log('help me')
  console.log(req.body.email, req.body.password, req.body.f_name, req.body.l_name)
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    f_name: req.body.f_name,
    l_name: req.body.l_name
  });
  newUser.save().then(response => {
    response.success = true;
    console.log(response);
    res.json(response);
  }).catch(error => {
    console.log('maybe')
    // console.log(error)
    res.send(error);
  });
});

  // Enables the end user to grab all todo items in the database
  app.post('/location', (req, res) => {

      User.findByIdAndUpdate(req.body.user_id, {$set: {
          lat: new Number(req.body.lat),
          long: new Number(req.body.long),
          updated_last: new Date(req.body.last_updated),
          location_name: new String(req.body.location_name)
      }}).then(response => {
          res.send(response);
        })
      .catch(error => {
          res.send(error);
      });
});


// Launch the server on port 3000
const server = app.listen(port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
