var latestCache = '2018-10-03_08:15:55';
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(latestCache).then(function (cache) {
            return cache.addAll([
                // there is only 1 page in this site
                'https://null.place/',
                'https://null.place/index.html'
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
