var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var kue = require('kue');

var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

let username = 'buskergreg';
router.use(bodyParser.json());
router.post('/', (req, res) => {
    var lat = req.body.latitude;
    var log = req.body.longitude;

    let job = queue.create('location', {
        title: `Location update for ${username}`,
        username: username,
        latitude: lat,
        longitude: long,
    })
    .removeOnComplete(true)
    .save(err => {
        if (!err) {
            console.log(job.id, job.title);
        }
        resolve();
    });

    res.status(200);
    res.send();
});

module.exports = router;