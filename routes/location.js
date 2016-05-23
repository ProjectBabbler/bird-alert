var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var kue = require('kue');
var firebase = require('../firebase');

var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

let username = 'buskergreg';
router.use(bodyParser.json());
router.all('/', (req, res) => {
    var lat = req.body.latitude;
    var log = req.body.longitude;
    firebase.database().ref('ebird/notable').child('US-CA').once('value').then(results => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send({
            notable: results.val(),
        });
    }).catch(e => {
        res.status(500);
        res.send(JSON.stringify(e));
    });
});

module.exports = router;