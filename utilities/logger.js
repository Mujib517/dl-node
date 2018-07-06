const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: 'dl-products',
  streams: [{
    level: 30,
    path: 'logs/application.log'
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