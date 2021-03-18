//public map - client side
//calling the service worker to run in background when opening the web app in browser
if ('serviceWorker' in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                return registration.update();
            })
    });
}
