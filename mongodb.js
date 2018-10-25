const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongodbUri = 'mongodb://arunnk:20112014ap#@ds139523.mlab.com:39523/react';

mongoose.connect(mongodbUri, { keepAlive: 300000, connectTimeoutMS: 30000, useMongoClient: true});

var db = mongoose.connection;    
db.on('error', console.error.bind(console, 'connection error:'));  

db.once('open', () =>{
    console.log('connected to Database') 
    const twoDays = 2 * 24 * 60 * 60; // 2 days * 24 hours * 60 minutes * 60 seconds
    const twoDaysMil = 1000 * twoDays; // 2 days in milliseconds
    db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
  
    // ---->> SET UP SESSIONS <<----
    app.use(session({
      secret: 'mySecretString',
      saveUninitialized: false,
      resave: false,
      cookie: {maxAge: twoDaysMil},
      store: new MongoStore({mongooseConnection: db, ttl: twoDays})
    }))

    app.listen(3001, function(err){
        if(err){
          return console.log(err);
        }
        console.log('API Server is listening on http://localhost:3001');
    })

    require('./apiServer')(app);
})

module.exports = app;
