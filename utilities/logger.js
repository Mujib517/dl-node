const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: 'dl-products',
  streams: [{
    path: '/logs/application.log'
  }]
});

module.exports = logger;