const Review = require('../models/review.model');

class ReviewCtrl {

  save(req, res) {
    var review = new Review(req.body);

    review.save()
      .then(function (result) {
        res.status(201);
        res.json(result);
      })
      .catch(function () {
        res.status(500);
        res.send("Internal Server Error");
      });
  }
}

module.exports = new ReviewCtrl();