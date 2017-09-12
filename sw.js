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

this.addEventListener('push', function(event) {
    const data = getNotificationData(event.data);
    event.waitUntil(
      this.registration.showNotification(data.title, {
        body: data.body,
        icon: './images/icon.png'
      })
    );
});

this.addEventListener('notificationclick', function(event) {
    event.notification.close();
});

this.addEventListener('notificationclose', function(event) {
});

function getNotificationData(data) {
    if (data) {
        try {
            return data.json();
        } catch(e) {
            return {
                title: 'Text',
                body: data.text()
            };
        }
    } else {
        return {
            title: 'Text',
            body: 'This is a Empty test'
        };
    }
}

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
