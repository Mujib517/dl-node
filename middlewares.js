const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = {

  authenticate: function (req, res, next) {
    let base64String = req.headers["authorization"].replace("Basic ", "");
    let decodedString = new Buffer(base64String, 'base64').toString(); // Ta-da

    let tokens = decodedString.split(":");

    let username = tokens[0];
    let password = tokens[1];

    if (username === "admin" && password === "password") next();
    else {
      res.status(401);
      res.send("Unauthorized");
    }
  },


  tokenAuth: function (req, res, next) {
    let token = req.headers["authorization"];

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    jwt.verify(token, config.jwtPassword, function (err) {
      if (err) {
        res.status(401);
        res.send("Unauthorized");
      }
      else next();
    });
  }
};
