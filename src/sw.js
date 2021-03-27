// service worker is a life cycle in fases, the common: install, activate and fetch
// it checks requests between client en server it sits in between the two, proxy
// can check the network
// when the sw gets a request it can do something with that request
// for now i want to cache the offline page for when there is no internet connection
// this file is registered in the script.js when the page is loaded in the browser
// source: https://github.com/cmda-minor-web/progressive-web-apps-2021/blob/master/examples/node-simple/public/sw.js

const CORE_CACHE = 1
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`
//this will cache the style.css, the /offline page and the manifest.json
const CORE_ASSETS = ["manifest.json", "/offline", "css/style.css"] 

//installing service worker
self.addEventListener('install', (event) => {
    //console.logs in browser when installed
    console.log("Installed")
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
        .then(cache => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    )
})

//activating service worker
self.addEventListener("activate", (event) => {
    console.log("Activated")
    event.waitUntil(clients.claim())
})

//listens when a request is fetched
self.addEventListener("fetch", (event) => {
    const req = event.request
    //console.log every fetch request in browser
    // to understand what this does
    console.log("Fetching:" + req.url)
    // in console.log it logs the fetch done from the API, so for example all albums
    // but also fetch the css and img from the server
    
    // show cached request from cache
    event.respondWith(
        //this searches a match in cache to see if something is already in the cache and shows that
        // if not it will cache the page then
        caches.match(req)
            .then(cachedRes => {
                if (cachedRes) {
                    return cachedRes
                }
                return fetch(req)
                    .then((fetchRes) => fetchRes)
                    //when an error occurs (like a network fail) it with get the /offline page from the cache and show it
                    .catch((err) => {
                        //opens cache
                        return caches.open(CORE_CACHE_NAME)
                        .then(cache => cache.match('/offline'))})
        })
    )
})