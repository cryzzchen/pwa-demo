function hasSW () {
    return 'serviceWorker' in navigator &&
                (window.fetch || 'imageRendering' in document.documentElement.style) &&
                (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname.indexOf('127.') === 0);
}

function install (scope) {
    if (hasSW()) {
        navigator.serviceWorker.register('/sw.js', {scope}).then((reg) => {
            if(reg.installing) {
              console.log('Service worker installing');
            } else if(reg.waiting) {
              console.log('Service worker installed');
            } else if(reg.active) {
              console.log('Service worker active');
            }
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

install('/');

const permission = checkPermission();
if (permission !== 'granted') {

}

window.addEventListener('load', function () {
    if (checkPermission() !== 'granted') {
        requestPermission();
    }

    const n = new Notification("hi", {
        body: "This is body",
        icon: "https://qhyxpicoss.kujiale.com/2017/08/31/LGT2N3AKAEDGU5Q3AAAAACA8_144x144.png"
    });
    n.onshow = function() {
        setTimeout(n.close.bind(n), 5000);
    };
});