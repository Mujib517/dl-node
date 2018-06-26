
// 1xx -- information
// 2xx -- success
// 3xx -- redirects
// 4xx -- client error
// 5xx -- server errors

class DefaultCtrl {

  get(req, res) {
    res.status(200); //ok
    res.send("Express API");
  }

  health(req, res) {
    var obj = {
      status: "Up"
    };
    res.status(200);
    res.json(obj);
  }

}


module.exports = new DefaultCtrl();