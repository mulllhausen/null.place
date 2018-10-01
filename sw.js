var latestCache = 'v1';
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(latestCache).then(function (cache) {
            return cache.addAll([
                // there is only 1 page in this site
                'https://null.place',
                'https://null.place/',
                'https://null.place/index.html' // = 404.html in the back end
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    // delete all caches except latestCache
    caches.keys().then(function (names) {
        for (let name of names) {
            if (name == latestCache) continue;
            caches.delete(name);
        }
    });
});

self.addEventListener('fetch', function (event) {
    // all requests return the index page
    event.respondWith(caches.match('https://null.place/index.html'));
});