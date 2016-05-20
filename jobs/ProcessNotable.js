var kue = require('kue');
var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

queue.process('notable', 3, (job, done) => {
    console.log(job.data);
    done();
});
