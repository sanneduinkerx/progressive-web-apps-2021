# Progressive Web Apps @cmda-minor-web · 20-21
Here I convert the client side web application from [web app from scratch](https://github.com/sanneduinkerx/web-app-from-scratch-2021) into a server side rendered application.

## Web App - Album Libray 🎶
Album Library is a web app where you can find albums from your favourite artists. You can find more information per album and the tracks from that album. It gives good feedback to the user with an error and loading state. Try it [here](https://album-library.herokuapp.com/).

![](https://user-images.githubusercontent.com/60745348/109557068-e3014280-7ad7-11eb-92cf-a8288a93ca1d.png)
![](https://user-images.githubusercontent.com/60745348/109557105-ed234100-7ad7-11eb-9f9e-483464c93914.png)

### Web App Link 🔗
You can find the web app [here](https://album-library.herokuapp.com/). 

## How to install this project

1. Clone this project 

    In terminal:
    ```
    git clone https://github.com/sanneduinkerx/progressive-web-apps-2021
    ```

2. Install dependencies
    ```
    npm install
    ```

3. To start run the server:
    ```
    npm run start
    ```

    or If you make changes and want the server to restart itself when making changes:

    ```
    npm run dev
    ```

4. Go to localhost
    ```
    http://localhost:3002/
    ```

## API - LastFM 🎵
I've chosen the LastFM API. 
![](https://user-images.githubusercontent.com/60745348/107949699-f9ff4b00-6f95-11eb-9e98-a5ffa4456ba5.png)
![](https://user-images.githubusercontent.com/60745348/111075209-2b146200-84e7-11eb-904d-84078385e15d.png)

The API has a lot off different methods, for example:
- artist.GetTopAlbums
- artist.GetTopTracks
- album.getInfo
- chart.getTopArtists
- geo.GetTopTracks

I used, for my web app:
- artist.GetTopAlbums
- album.getInfo

The tricky part about this API i found was that to get to the data you had to really get into the object because it was quiet nested, so to get the data i used: apiData.topalbums.album, to select the name of the album and img within there. 
The api shows in total 50 albums per page, if asking for the albums from a specific artist.
I also saw that some albums didn't always have an image cover or the names of the album weren't there, to fix that i filter those albums out. With album.getInfo more info was missing if i wanted info from the wiki, some albums didn't have that object and therefore i will use an error message to give feedback.

More info about the API can be found [here](https://www.last.fm/api/intro). 

### Wishlist:
Things I want to add/change in the future:
- A back link on detailpage to go back to search results from an artist
- to structure code more, make modules for routes and the api fetch (only if there is time)
- Loading state
- favorites list, with cache service worker

## npm packages
The npm packages i used in this project are:

- For template engine: EJS 
    To load a template in a certain path you can use res.render('templateName'), and you can give data with it to render server side and serve to client. For example you can give the fetched data from an API to the template, and with <%= data.name %> you can put it in the template and it wil render the right data.
- Express: 
    A web framework with feature for routing. And supports template engines such as EJS. for more info [click here](https://www.npmjs.com/package/express)
- Node-fetch: 
    to use fetch(url) to fetch data from lastFM API.
- I also used buildscript and therefore i used **Gulp**, to build, combine and minify css and js files and put it in a public map to serve  on client side. I used:
    - gulp concat - combine files
    - gulp cssnano - minify css
    - gulp uglify - minify js

## Sources
Sources used to make this web app:
- How to use EJS to template your node application - [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application)
- How to use nodejs req object in express - [Digital Ocean](https://www.digitalocean.com/community/tutorials/nodejs-req-object-in-expressjs#:~:text=great%2Dwhite%22%20.-,The%20req.,requests%20in%20the%20Express%20server)
- Filter is not a function - [stack overflow](https://stackoverflow.com/questions/55458675/filter-is-not-a-function)
- JS string methods - [w3 schools](https://www.w3schools.com/js/js_string_methods.asp)
- Hello world, setting up server - [Express JS](https://expressjs.com/en/starter/hello-world.html)
- Static files - [Express JS](https://expressjs.com/en/starter/static-files.html)
- PWA Tutorial for Beginners #3 - The Web App Manifest [Youtube - The Net Ninja](https://www.youtube.com/watch?v=AlEdGOLhuM8)
- Deploy your node express app on heroku - [dzone](https://dzone.com/articles/deploy-your-node-express-app-on-heroku-in-8-easy-s)
- Buildscript - getting started - [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
- super simple gulp tutorial for beginners - [FreeCodeCamp](https://www.freecodecamp.org/news/super-simple-gulp-tutorial-for-beginners-45141974bfe8/)
<!-- 
 ### Week 2 - Progressive Web App 🚀

Goals: Convert application to a Progressive Web App

[Exercises](https://github.com/cmda-minor-web/progressive-web-apps-2021/blob/master/course/week-2.md)  
[Progressive Web Apps - slides Declan Rek](https://github.com/cmda-minor-web/progressive-web-apps-1920/blob/master/course/cmd-2020-progressive-web-apps.pdf)


### Week 3 - Critical Rendering Path 📉 

Doel: Optimize the Critical Rendering Path   
[Exercises](https://github.com/cmda-minor-web/progressive-web-apps-2021/blob/master/course/week-3.md)  
[Critical Rendering Path - slides Declan Rek](https://github.com/cmda-minor-web/progressive-web-apps-1920/blob/master/course/cmd-2020-critical-rendering-path.pdf) -->
 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
