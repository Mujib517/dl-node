module.exports= {

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
  }
};
