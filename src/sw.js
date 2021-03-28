// sw runs in background
// its a life cycle in fases, install, activate and fetch 
// it can listen to events between browser and server, acts like a proxy
// sw can do something with that request - like caching it to load content offline later
// on a separate thread from the main thread 

// assets - for pre-caching 
// name of the string with all cached assets
const staticCacheName = 'pwa-static';
// all the assets i want to pre cache 
const assets = [
    "script/script.js", 
    "/offline", 
    "css/style.css", 
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
];

// install event
// self, refers to itself -> the service worker
self.addEventListener('install', (event) => {
    // sw listens to install event and then fires this function
    // pre-caching in install event because you don't have to cache the assets every time, only when sw.js is changed
    console.log("Installed");
    // waitUntil, because the sw stops when it is installed and caching is async so maybe takes longer
    // and we arent certain if it will be done when the sw is installed so it has to wait until it has cached then its done
    // so now it waits until the promise caches.open is resolved
    event.waitUntil(
        // open: open cache with name staticCacheName, and checks if it already exists or otherwise gets created
        caches.open(staticCacheName).then(cache =>{
            //it get the resource in addAll() from server 
            cache.addAll(assets).then(() => self.skipWaiting());
        })
    );
});  

//activate event, note: this doesnt actually activate the sw it LISTENS when activated
self.addEventListener('activate', (event) => {
    // when something changes in the sw.js and a browser tab is still open it does install the new version but waits to activate
    // until all tabs are closed and reopened 
    console.log("Activated");
    event.waitUntil(clients.claim());
})

//fetch event
// the sw.js sits in between server and browser and listens for every fetch request, acting as a proxy
self.addEventListener('fetch', (event) => {

    // it pauses fetch event and responds with the function under here
    event.respondWith(
        //check if something matches in the cache
        caches.match(event.request).then(cacheRes => {

            // so returns the cached file that matches the event.request 
            // and if cacheRes isn't empty it gets the requested file from cache
            if (cacheRes){
                return cacheRes
            } 
            //if it doesnt match continues with the fetch request originally
            return fetch(event.request)
                .then((fetchRes) => fetchRes)
                //if there is an error with the request
                // in catch it will then get from the cache /offline page
                .catch((err) =>{
                    return caches.open(staticCacheName)
                        .then(cache => cache.match('/offline'))
                })
        })
    )
})

