this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([])
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response !== undefined) {
            return response;
        }

        return fetch(event.request).then(function (response) {
            let responseClone = response.clone();

            caches.open('v1').then(function (cache) {
                cache.put(event.request, responseClone);
            });

            return response;
        }).catch(function () {
            // backup
        });
    }));
});

// 更新
// this.addEventListener('activate', function (event) {
//     const cacheWhilteList = ['v2'];

//     event.waitUntil(
//         caches.keys().then(function (keyList) {
//             return Promise.all(keyList.map(function (key) {
//                 if (cacheWhilteList.indexOf(key) === -1) {
//                     return caches.delete(key);
//                 }
//             }));
//         });
//     );
// });