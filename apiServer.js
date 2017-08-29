var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
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

// SAVE TO SESSION API
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
})

// GET SESSION CART API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

// ---->> END SESSION SET UP <<----

var Books = require('./models/books.js');

// ---->> POST BOOKS <<----
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// ---->> GET BOOKS <<----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// ---->> DELETE BOOKS <<----
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// ---->> GET BOOKS IMAGES API <<----
app.get('/images', function(req, res){
  const imgFolder = __dirname + '/public/images/';
  // REQUIRE FILE SYSTEM
  const fs = require('fs');
  // READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.log(err);
    }
    // CREATE AN EMPTY ARRAY
    const filesArr = [];
    // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
    files.forEach(function(file){
      filesArr.push({name: file});
    })
    // SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(filesArr);
  })
})

// END APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})