"use strict"
var express = require('express');
var app = express();
var path = require('path');

//MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {
	console.log("App is listening on port 3000")
})