
function hasSW () {
    return 'serviceWorker' in navigator &&
                (window.fetch || 'imageRendering' in document.documentElement.style) &&
                (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname.indexOf('127.') === 0);
}

function install (scope) {
    if (hasSW()) {
        return navigator.serviceWorker.register('/pwa-demo/sw.js', {scope}).then((reg) => {
            if(reg.installing) {
              console.log('Service worker installing');
            } else if(reg.waiting) {
              console.log('Service worker installed');
            } else if(reg.active) {
              console.log('Service worker active');
            }
            return reg;
        }).catch((error) => {
            console.log('Registration failed with ' + error);
        });
    }
}

function checkPermission() {
    return  Notification.permission;
}
function requestPermission() {
    Notification.requestPermission(function (status) {
        // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
        if (Notification.permission !== status) {
             Notification.permission = status;
        }
    });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

window.addEventListener('load', function () {
    // 1. register a service worker
    install('/pwa-demo/').then((swRegistration) => {
        // 2. request permission
        if (checkPermission() !== 'granted') {  // default,granted,denied
            requestPermission();
        }

        // 3. subscribe a user with pushManager
        // https://web-push-codelab.appspot.com/
        swRegistration.pushManager.getSubscription().then((subscription) => {
            if (subscription === null) {
                swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        'BChvSXQBTmNA2lwVxTo0Ph2Y2fiHD7JBWq5-gZogPZQqnSPFyim8LOtNUnymAxJmE51zskOLnvdKjqtqJKqf_WU'
                    )
                }).then((pushSubscription) => {
                    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));

                    // 4. Send a Subscription to Your Server

//                     fetch('/api/subscription', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(pushSubscription)
//                     }).then((response) => {
//                         return response.json();
//                     }).then((responseData) => {

//                     })
                });
            } else {
                console.log(JSON.stringify(subscription));
            }
        });
    });
});

window.addEventListener('beforeinstallprompt', function(e) {
  // beforeinstallprompt Event fired
  // e.userChoice will return a Promise. 
  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
  e.userChoice.then(function(choiceResult) {

    console.log(choiceResult.outcome);

    if(choiceResult.outcome == 'dismissed') {
      console.log('User cancelled home screen install');
    }
    else {
      console.log('User added to home screen');
    }
  });
});
