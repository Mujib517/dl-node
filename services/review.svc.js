const Review = require('../models/review.model');

class ReviewService {

  get(id) {
    return Review.find({ productId: id }, { _id: 0, __v: 0 })
      .exec();
  }

  getAvgRating(id){
    return Review.aggregate(
      [
        { $match: { productId: id } },
        { $group: { _id: '$productId', avgRating: { $avg: '$rating' } } },
        { $project: { _id: 0 } }
      ]
    ).exec()
  }
}

module.exports = new ReviewService();