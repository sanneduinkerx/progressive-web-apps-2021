// module imported express - source: https://expressjs.com/en/starter/hello-world.html
// require same as import, you can use import but thats from the latest version which isn't stable yet
const express = require('express');
const fetch = require('node-fetch'); // for usage: https://www.npmjs.com/package/node-fetch

const app = express();
//port to listen to in browser
const port = 3000;

//API URL:
const endpoint = 'https://ws.audioscrobbler.com/2.0/?method=';
const apiKey = '9445b881096d29d7c6de9f9d2eb6b50d';

// setting ejs as the view engine
app.set('view engine', 'ejs');
// you tell express to use static and look in public file
// you can load the static files with express.static: http://localhost:3000/style.css
// more info: https://expressjs.com/en/starter/static-files.html
//to serve static files such as css or images use this:
app.use(express.static('public'));

app.get('/', function (req, res) {
  //sends response to browser
  // res.send('Hello World!!!');  
  res.render('home');
})

// starting page, req -> request and a respond
// get -> an http request method
// the '/' is the path on server - when that route matches the function in the route gets executed
app.get('/results', function (req, res) {

  //method, getting top albums and filling url
  const artistName = 'Queen';
  const method = 'artist.gettopalbums'; 
  const url = `${endpoint}${method}&artist=${artistName}&api_key=${apiKey}&format=json`; 

    // render will look in the views folder to show view to user
    // res.render('albums'); 

    // fetch data with url, albums from a specific artist Queen
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.topalbums.album[0].name);
         // render will look in the views folder to show view to user
        res.render('albums', {
          title: data.topalbums.album[0].name,
          img: data.topalbums.album[0].image[2]['#text']
        })
      })
  }) 

//path to details from one album, if path matches
app.get('/details/:albumName', function (req, res) {

    // render will look in the views folder to show view to user
    res.render('details');
  }) 

app.listen(port, function () {
    // log in terminal with message
    console.log(`Example app listening at http://localhost:${port}`);
  })
 