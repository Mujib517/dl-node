const Product = require('../models/product.model');

class ProductService {
  //ES7
  getProduct(id) {
    return Product.findById(id)
      .exec(); //a promise
  }

  save(data) {
    var product = new Product(data);
    return product.save();
  }

  delete(id) {
    return Product.findByIdAndRemove(id)
      .exec();
  }

  update(id, data) {

    return Product.findByIdAndUpdate(id, {
      $set: {
        brand: data.brand,
        model: data.model,
        price: data.price,
        inStock: data.inStock
      }
    }).exec();
  }
}

module.exports = new ProductService();