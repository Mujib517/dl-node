const userSvc = require('../services/user.svc');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UserCtrl {

  async register(req, res) {
    try {

      let hashedPwd = bcrypt.hashSync(req.body.password, 2);
      req.body.password = hashedPwd;

      await userSvc.register(req.body);

      res.status(200);
      res.send("Successfully registered");
    }
    catch (err) {

      if (err.errmsg.indexOf("duplicate key error") > -1) {
        res.status(400);
        res.send("Email already exists");
      }
      else {
        res.status(500);
        res.send(err);
      }
    }
  }

  async login(req, res) {
    let user = await userSvc.getUser(req.body.username);
    let result = bcrypt.compareSync(req.body.password, user.password);

    if (result) {

      let token = jwt.sign({ username: req.body.username }, config.jwtPassword, { expiresIn: '1h' });

      var response = {
        username: req.body.username,
        token: token
      };

      res.status(200);
      res.json(response);
    }
    else {
      res.status(401);
      res.send("Unauthorized");
    }

  }
}

module.exports = new UserCtrl();