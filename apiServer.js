module.exports = function(app) {

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
    // db.collection('books').save(book, (err, result) => {
    //   if (err) return console.log(err)
    //   res.send('Book added!');
    // })
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
}
