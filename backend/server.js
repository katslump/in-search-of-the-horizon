import express from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import mongoose from 'mongoose';
import routes from './routes/index';
import bodyParser from 'body-parser';

// Import models
import User from './models/User.js'
import Location from './models/Location.js'

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
    console.log("got inside");
  res.json({ message: "Hoirozns!" })
  }
);

// Enables the end user to grab all todo items in the database
// app.get('/users', (req, res) => {
//     console.log("made it to users");
//     res.send("made it to users");
//   User.find().catch(error => {
//         console.log(error);
//     res.send(error);
//   }).then(response => {
//       console.log(response);
//     res.send({users: response});
//   })
// });

// Launch the server on port 3000
const server = app.listen(port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
