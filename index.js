// server side rendering

// modules imported 
// require same as import, you can use import but thats from the latest version which isn't stable yet
const express = require('express');
const fetch = require('node-fetch');
//imported compression to compress files via network
const compression = require('compression');

const app = express();
//port to listen to in browser
const port = process.env.PORT || 3002; 

//API URL:
const endpoint = 'https://ws.audioscrobbler.com/2.0/?method=';
const apiKey = '9445b881096d29d7c6de9f9d2eb6b50d';

// setting ejs as the view engine
app.set('view engine', 'ejs'); 

// you tell express to use static and look in public folder
// you can load the static files with express.static: http://localhost:3002/style.css
//to serve static files such as css or images use this:
app.use(express.static('public'));
//compresses all responses
app.use(compression());

// starting page, req -> request and a respond
// get -> an http request method
// the '/' is the path on server - when that route matches the function in the route gets executed
app.get('/', function (req, res) {
  //the (res) respond: renders ejs template home, from the view folder
  res.render('home');
})

// new path for the results
app.get('/results', function (req, res) {

  //method, getting top albums and filling url 
  const method = 'artist.gettopalbums'; 

  // request, req.query express will search for a match query: ArtistKeyword within the url
  // when user searches for a certain artist express requests that artist from the url with req.query
  const url = `${endpoint}${method}&artist=${req.query.ArtistKeyword}&api_key=${apiKey}&format=json`; 

  // redirect when the url has only the path /results
  // which also is also a result with an artist name undefined, which is what we don't want
  // so if artistKeyword is undefined
  if(!req.query.ArtistKeyword){

    // then redirect to home
    // so when user for example pushes enter without filling in the search bar it doesnt search for undefined, but does nothing in the users eyes
    res.redirect('/');

  } else{

      // fetch data with url, albums from a specific artist 
      fetch(url)
        .then(response => response.json())
        .then(data => { 

          //filter apiData - all objects without an image gets filtered out
          //object.values, source: https://stackoverflow.com/questions/55458675/filter-is-not-a-function
          //for better performance -> smallest image from the API = there were 4 images i picked the smallest one
          const filteredData = Object.values(data.topalbums.album).filter(noImg => noImg.image[0]['#text'] != "");

          // render will look in the views folder to show view to user, the albums page
          res.render('albums', {
            // giving data to objects to use in template
            albums: filteredData,
            artistName: filteredData[0].artist.name
            })
        })
          .catch(() => {

            // catch error when something goes wrong -> error state
            //handle error here
            res.render('error', {
              error: 'We could not find the artist you were looking for, maybe try something else',
              link: '/',
              linkmessage: 'Go back to home'
            })
        })
      }
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

        // splitting and retrieving pieces from string
        // source: https://www.w3schools.com/js/js_string_methods.asp
        const summaryText = data.album.wiki.summary;
        //finding the position where the link element starts in string summary 
        const linkPosition = summaryText.lastIndexOf("<a href");
        const summaryStr = summaryText.substr(0,linkPosition);
        const linkStr = summaryText.substr(linkPosition);
        //split the retrieved link in 3 with " - to get de a href link and text content from a href
        const stringArray = linkStr.split('"');
        const link2Position = stringArray[2].indexOf("</a>");
        const linkTxt = stringArray[2].substr(1, link2Position - 1);

        // render will look in the views folder to show view to user, giving data with it to fill template
        res.render('details', {
          albumName: data.album.name,
          artist: data.album.artist,
          img: data.album.image[3]['#text'], 
          playcount: data.album.playcount,
          listeners: data.album.listeners,
          wiki: summaryStr,
          linkTxt: linkTxt,
          aHref: stringArray[1],
          tracks: data.album.tracks.track
        })
    }) 
      .catch(() => {
        //handle error here
        res.render('error', {
          error: 'The information you were looking for could not be found.',
          link: `/results/?ArtistKeyword=${req.params.artistName}&submit=`,
          linkmessage: 'Go back to all albums'
        })
      })
  }) 

// when network fails, show offline page from cache
app.get('/offline', function (req, res) {
    res.render('offline');
})

app.listen(port, function () {
    // log in terminal with message
    console.log(`Example app listening at http://localhost:${port}`);
})
 