// module imported express - source: https://expressjs.com/en/starter/hello-world.html
// require same as import, you can use import but thats from the latest version which isn't stable yet
const express = require('express');
const fetch = require('node-fetch'); // for usage: https://www.npmjs.com/package/node-fetch

const app = express();
//port to listen to in browser
const port = 3000;

// setting ejs as the view engine
app.set('view engine', 'ejs');

// starting page, req -> request and a respond
// get -> an http request method
// the '/' is the path on server - when that route matches the function in the route gets executed
app.get('/', function (req, res) {
    //sends response to browser
    res.send('Hello World!!!');  
  })

// different path /overview path 
app.get('/albums', function (req, res) {
    // render will look in the views folder to show view to user
    res.render('albums');
  }) 

//path to details from one album
app.get('/details', function (req, res) {
    // render will look in the views folder to show view to user
    res.render('details');
  }) 

app.listen(port, function () {
    // log in terminal with message
    console.log(`Example app listening at http://localhost:${port}`);
  })
 