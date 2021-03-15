// module imported express - source: https://expressjs.com/en/starter/hello-world.html
// require same as import, you can use import but thats from the latest version which isn't stable yet
const express = require('express');
const fetch = require('node-fetch'); // for usage: https://www.npmjs.com/package/node-fetch

const app = express();
//port to listen to in browser
const port = 3000; 

//API URL:
const endpoint = 'https://ws.audioscrobbler.com/2.0/?method=';
const apiKey = '9445b881096d29d7c6de9f9d2eb6b50d'; // later -> hide api key!

// setting ejs as the view engine
app.set('view engine', 'ejs');
// you tell express to use static and look in public file
// you can load the static files with express.static: http://localhost:3000/style.css
// more info: https://expressjs.com/en/starter/static-files.html
//to serve static files such as css or images use this:
app.use(express.static('public'));

// starting page, req -> request and a respond
// get -> an http request method
// the '/' is the path on server - when that route matches the function in the route gets executed
app.get('/', function (req, res) {
  //renders template home
  res.render('home');
  //statisch inladen html from public -> search home page?
})

// new path for the results
app.get('/results', function (req, res) {
  //method, getting top albums and filling url
  const method = 'artist.gettopalbums'; 
  // req.query = src: https://www.digitalocean.com/community/tutorials/nodejs-req-object-in-expressjs#:~:text=great%2Dwhite%22%20.-,The%20req.,requests%20in%20the%20Express%20server.
  // req.query express will search for a match ArtistKeyword within the url
  const url = `${endpoint}${method}&artist=${req.query.ArtistKeyword}&api_key=${apiKey}&format=json`; 

  // fetch data with url, albums from a specific artist 
  // later modules
  fetch(url)
    .then(response => response.json())
    .then(data => { 
      
      //filter apiData - all objects without an image gets filtered out
      //object.values, source: https://stackoverflow.com/questions/55458675/filter-is-not-a-function
      const filteredData = Object.values(data.topalbums.album).filter(noImg => noImg.image[3]['#text'] != "");

      // render will look in the views folder to show view to user
      res.render('albumResults', {
        // giving data to objects to use in template
        albums: filteredData,
        artistName: data.topalbums.album[0].artist.name 
        })
      })
      // catch error when something goes wrong -> error state
}) 

//path to details from one album, if path matches
app.get('/details/:albumName/:artistName', function (req, res) {
    // new methode in URL to get data
    const methodGetinfo = 'album.getinfo'; 
    //URL to fetch 
    // req.params.albumName -> a request, parameter from path, the album name 
    const url = `${endpoint}${methodGetinfo}&api_key=${apiKey}&artist=${req.params.artistName}&album=${req.params.albumName}&format=json`;
     
    // fetch data with url, albums from a specific artist Queen
    fetch(url)
      .then(response => response.json())
      .then(data => {
     // render will look in the views folder to show view to user
      res.render('details', {
        albumName: data.album.name,
        artist: data.album.artist,
        img: data.album.image[3]['#text'],
        playcount: data.album.playcount,
        listeners: data.album.listeners,
        wiki: data.album.wiki.summary,
        tracks: data.album.tracks.track
      })
    })
    
  }) 

app.get('/offline', function (req, res) {
    res.render('offline');
}) 

app.listen(port, function () {
    // log in terminal with message
    console.log(`Example app listening at http://localhost:${port}`);
})
 