var kue = require('kue');
var locations = require('bird-locations');

var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

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

    Promise.all(ps).then(() => {
        process.exit(0);
    }).catch((e) => {
        console.log(e);
        process.exit(1);
    })
});

