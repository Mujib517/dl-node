const Product = require('../models/product.model');

class ProductService {

  get(pageIndex, pageSize, sort, direction) {

    direction = direction === 'asc' ? " " : "-";

    return Product.find({}, { __v: 0 })
      .sort(direction + sort)
      .skip(pageIndex * pageSize)
      .limit(pageSize)
      .exec();
  }

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

  patch(id, data) {
    Product.findById(id, function (err, product) {
      if (product) {
        for (var key in data) {
          product[key] = data[key];
        }
        return Product.findByIdAndUpdate(id, product).exec();
      }
    });
  }

  getCount() {
    return Product.count()
      .exec();
  }
}

module.exports = new ProductService();