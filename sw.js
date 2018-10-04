var latestCache = '2018-10-05_08:30';
var rootDomain = 'https://null.place/';
var allAssets = [
    // there is only 1 page in this site
    '',
    'index.html',

    // icons
    'android-chrome-192x192.png',
    'android-chrome-256x256.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'mstile-144x144.png',
    'mstile-150x150.png',
    'mstile-310x150.png',
    'mstile-310x310.png',
    'mstile-70x70.png',
    'safari-pinned-tab.svg',

    // configs
    'manifest.json',
    'browserconfig.xml'
];
// prepend root domain to all assets
for (var i = 0; i < allAssets.length; i++) {
    allAssets[i] = rootDomain + allAssets[i];
}
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(latestCache).then(function (cache) {
            return cache.addAll(allAssets);
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

    // 404 = show the index page
    if (!allAssets.includes(event.request.url)) {
        event.respondWith(caches.match(rootDomain));
        return;
    }

    // return all known assets
    event.respondWith(caches.match(event.request));
});
