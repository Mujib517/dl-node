const bunyan = require("bunyan");
const path = require("path");

const logger = bunyan.createLogger({
  name: 'dl-products',
  streams: [{
    level: 30,
    path: path.join('logs', 'application.log')
  },
  {
    level: 40,
    path: 'logs/warnings.log'
  },
  {
    level: 50,
    path: 'logs/error.log'
  }
  ]
});

module.exports = logger;