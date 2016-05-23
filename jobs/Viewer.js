var kue = require('kue');

var queue = kue.createQueue({
  redis: process.env.REDIS_URL,
});

kue.app.listen(process.env.PORT || 8000);
