var kue = require('kue');
var locations = require('bird-locations');

var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

locations.getAll().then(list => {
    for (var code in list) {
        let job = queue.create('notable', {
            title: `fetch notable for ${code}`,
            code: code,
        })
        .removeOnComplete(true)
        .save(err => {
            if (!err) {
                console.log(job.id, `fetch notable for ${code}`);
            }
        });
    }
});
