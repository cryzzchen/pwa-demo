const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, './src/static')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(6060, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('The server is on 6060');
    }
});