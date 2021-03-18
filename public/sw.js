// service worker is a proxy that checks requests between client en server it sits in between the two
// when the sw gets a request it can do something with that request
// for now i want to cache the offline page for when there is no internet connection
// this file is registered in the script.js when the page is loaded in the browser

const CORE_CACHE = 1
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`
//this will cache the style.css, the /offline page and the manifest.json
const CORE_ASSETS = ["manifest.json","/offline", "css/style.css"] 

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
    console.log("Fetching:" + req.url)
    
    // show cached request from cache
    event.respondWith(
        caches.match(req)
            .then(cachedRes => {
                if (cachedRes) {
                    return cachedRes
                }
                return fetch(req)
                    .then((fetchRes) => fetchRes)
                    .catch((err) => {
                        return caches.open(CORE_CACHE_NAME)
                        .then(cache => cache.match('/offline'))})
        })
    )
})
