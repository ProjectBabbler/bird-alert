var kue = require('kue');
var locations = require('bird-locations');

var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

let username = 'buskergreg';
let code = 'US-CA';
new Promise((resolve, reject) => {
    let job = queue.create('need', {
        title: `fetch need for ${username} ${code}`,
        code: code,
        username: username,
    })
    .removeOnComplete(true)
    .save(err => {
        if (!err) {
            console.log(job.id, `fetch need for ${username} ${code}`);
        }
        resolve();
    });
}).then(() => {
    locations.getAll().then(list => {
        var ps = Object.keys(list).map(code => {
            return new Promise((resolve, reject) => {
                let job = queue.create('notable', {
                    title: `fetch notable for ${code}`,
                    code: code,
                })
                .removeOnComplete(true)
                .save(err => {
                    if (!err) {
                        console.log(job.id, `fetch notable for ${code}`);
                    }
                    resolve();
                });
            });
        });

        return Promise.all(ps);
}).then(() => {
    process.exit(0);
}).catch((e) => {
    console.log(e);
    process.exit(1);
})

