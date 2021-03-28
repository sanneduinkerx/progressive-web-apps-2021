//public folder - client side
// in this script you tell the browser to register a service worker on a separate thread
// this script is linked in html head
// followed tutorial: https://www.youtube.com/watch?v=6s697AJdlB8

//first check if browser even supports service worker with if statement
// navigator is an object in js that represents the browser and info about the browser
// so it checks if there is a service worker in the navigator object, if so it supports sw

if('serviceWorker' in navigator){
    // it will search for the sw.js file and register it as a service worker
    // is async
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err))
}