const express = require('express');
const ejs = require('ejs');
const path = require('path');
const webpush = require('web-push');
const bodyParser = require('body-parser');

// https://web-push-codelab.appspot.com/
const vapidKeys = {
	publicKey: 'BAx2Cf-5S79KpoygGLbIalJrNNRtouRay5RxB9Rp4tFWhfnXWOxKDC-Sr-KHKbDyfksDgD-n9dunx8cJadFZ6Ps',
	privateKey: 'oRm0U29UYo2hwI1s8bpsD-C3-Erh4_kQyZGgmJmlOAk'
}

webpush.setVapidDetails(
	'mailto:web-push-book@gauntface.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

const app = express();

app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, './src/static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api/subscription', (req, res) => {
	const subscription = req.body;
	res.send({
		ok: true
	});
});

app.listen(6060, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('The server is on 6060');
    }
});