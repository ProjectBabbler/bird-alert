var path = require('path');
var express = require('express');
var compression = require('compression');
var swig = require('swig');
var location = require('./routes/location');


var app = express();
app.use(compression());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/location', location);

app.get('/', (req, res) => {
    res.send('Working');
});

module.exports = app;
