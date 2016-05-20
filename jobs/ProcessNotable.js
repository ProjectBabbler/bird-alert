var kue = require('kue');
var ebirdjs = require('ebird-js');
var firebase = require('./firebase');
var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

queue.process('notable', 3, (job, done) => {
    console.log(`Processing for ${job.data.code}`);
    ebirdjs.data.notable.region.recent({
        r: job.data.code,
        back: 2,
    }).then(results => {
        firebase.database().ref('ebird/notable').child(job.data.code).set(results).then(() => {
            console.log(`Saving ${job.data.code}`);
        }).then(done);
    });
});
