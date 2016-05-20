var kue = require('kue');
var ebirdjs = require('ebird-js');
var ebird = require('ebird');
var firebase = require('./firebase');
var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

queue.process('notable', 1, (job, done) => {
    console.log(`Processing for ${job.data.code}`);
    ebirdjs.data.notable.region.recent({
        r: job.data.code,
        back: 2,
    }).then(results => {
        firebase.database().ref('ebird/notable').child(job.data.code).set(results).then(() => {
            console.log(`Saved ${job.data.code}`);
        }).then(done);
    });
});

queue.process('need', 1, (job, done) => {
    console.log(`Processing for ${job.data.username} ${job.data.code}`);
    var instance = new ebird();
    instance.auth(job.data.username, process.env.TEMP_PASSWORD).then(() => {
        return instance.alerts.needs(job.data.code);
    }).then(results => {
        console.log(results);
        firebase.database().ref('ebird/need').child(job.data.username).child(job.data.code).set(results).then(() => {
            console.log(`Saved ${job.data.username} ${job.data.code}`);
        }).then(done);
    });
});