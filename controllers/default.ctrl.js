const logger = require("../utilities/logger");
// 1xx -- information
// 2xx -- success
// 3xx -- redirects
// 4xx -- client error
// 5xx -- server errors

class DefaultCtrl {

  get(req, res) {

    logger.info("Inside Root Handler");

    res.status(200); //ok
    res.send("Express API Works!");
  }

  health(req, res) {
    var obj = {
      status: "Up"
    };
    logger.warn(obj);
    res.status(200);
    res.json(obj);
  }

}


module.exports = new DefaultCtrl();