// Import dependencies
import express from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import mongoose from 'mongoose';
import routes from './routes/index';
import bodyParser from 'body-parser';
import Expo from 'expo-server-sdk';

// Import models
import User from './models/User.js';

// Create a new Expo SDK client
let expo = new Expo();

// Set port to 3000
var port = parseInt(process.env.PORT) || 3000;

// Checks for env.sh file
if (!fs.existsSync('./env.sh')) {
    throw new Error('env.sh file is missing');
}

// Checks for database connection string in env.sh
if (!process.env.MONGODB_URI) {
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


function groupCheck(currentUser, allUsers) {

    // Gets group of users within a given radius
    let group = allUsers.filter(user => {
        let objlat = parseFloat(user.lat);
        let objlong = parseFloat(user.long);
        return currentUser.email !== user.email && currentUser.lat > objlat - .4 && currentUser.lat < objlat + .4 && currentUser.long > objlong - .4 && currentUser.long < objlong + .4;
    });
    return group;
}

function notificationCheck(currUser, group) {
    User.findById(currUser._id, function(err, info){
      if(err) {
        console.log(err)
      } else {
        if(info.group.map(person => (person.toString())).toString() !== group.map(person=>person._id.toString()).toString()) {
          const messages = group.map(person => ({
              to: person.pushToken, sound: 'default', body: `Current User ${currUser.f_name} is near you!`
              // data: { withSome: 'data' },
          })).filter(person => person.to);
          let chunks = expo.chunkPushNotifications(messages);
          // Sends notifcations to users using Expo API
          Promise.all(chunks.map(chunk => expo.sendPushNotificationsAsync(chunk))).then(console.log).catch(console.log);

          User.findOneAndUpdate({
              email: currUser.email
          }, {
              $set: {
                  group: group.map(user => user.id)
              }
          }, function(error, pos) {
              if (error) {
                  console.log(error);
              }
          })
        } else {
          console.log('this means the group was the same so no notification was sent')
        }
        // Crafts messages for group of users
      }
    })
}

app.get('/users', (req, res) => {
    let user = req.query.currentUser
    User.find().then(response => {
        User.findOne({email: user}).then((currUser) => {
            let group = groupCheck(currUser, response)
            notificationCheck(currUser, group)
            res.json({users: group})
        }) //.catch(error => res.json({ error: error}))
    })
});
// .catch(error => {
//     res.json({error: error});
// })
//
// User.update({_id:'5a9999e3f379104f91ec5002'}, { $set: {group:[]}}, function(error, result) {
//   console.log(error)
//   console.log(result)
// })

// Updates backend with latest user notification settings
app.post('/push-token', (req, res) => {
    User.findOneAndUpdate({
        email: req.body.user.username
    }, {
        $set: {
            pushToken: req.body.token.value
        }
    }, function(error, pos) {
        if (error) {
            console.log(error);
        }
    })
})

// Allows user to login
app.get('/login', (req, res) => {
    User.findOne({
        email: req.query.email
    }, function(error, results) {
        if (!results) {
            res.status(400).send('error in finding email');
        } else {
            if (results.password === req.query.password) {
                res.json(results);
            } else {
                res.status(400).send('error in finding password');
            }
        }
    })
})

// Allows user to register
app.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    f_name: req.body.f_name,
    l_name: req.body.l_name
  });
  newUser.save().then(response => {
    response.success = true;
    res.json(response);
  }).catch(error => {
    console.log(error)
    res.send(error);
  });
});

// Records users latest position and saves to db
app.post('/location', (req, res) => {

    User.findOneAndUpdate({
        email: req.body.user_id
    }, {
        $set: {
            lat: new Number(req.body.lat),
            long: new Number(req.body.long),
            updated_last: new Date(req.body.last_updated),
            location_name: new String(req.body.location_name)
        }
    }).then(response => {
        res.send(response);
    }).catch(error => {
        res.send(error);
    });
});

// Launches the server on port 3000
const server = app.listen(port, () => {
    const {address, port} = server.address();
    console.log(`Listening at http://${address}:${port}`);
});
