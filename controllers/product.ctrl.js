const Product = require('../models/product.model');

const productCtrl = {

  get: (req, res) => {

    //asynchronous
    Product
      .find()
      .exec()
      .then(function (products) {
        res.status(200)
          .json(products);
      })
      .catch(function (err) {

        res
          .status(500)
          .send("Internal Server Error");
      })
  },

  getById: (req, res) => {

    let id = req.params.id;

    Product.findById(id)
      .exec()
      .then(function (product) {
        res.status(200)
          .json(product);
      })
      .catch(function (err) {
        res.status(404)
          .send("Not Found");
      });
  },

  save: (req, res) => {

    var product = new Product(req.body);

    product
      .save()
      .then(function (savedProduct) {
        res.status(201); //Created
        res.json(savedProduct);
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      })
  },

  delete: (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id)
      .exec()
      .then(function () {
        res.status(204);  //No Content
        res.send();
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  },

  update: (req, res) => {
    let id = req.params.id;

    //Deferred Execution
    Product.findByIdAndUpdate(id, {
      $set: {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        inStock: req.body.inStock
      }
    }, function (err) {
      if (!err) {
        res.status(204);
        res.send();
      }
      else {
        res.status(500);
        res.send("Internal Server Error");
      }
    })



  },

  patch: (req, res) => {

    let id = req.params.id;
    delete req.body._id;

    Product.findById(id, function (err, product) {

      if (product) {
        for (var key in req.body) {
          product[key] = req.body[key];
        }

        Product.findByIdAndUpdate(id, product, function (err) {
          res.status(204);
          res.send();
        });
      }
      else {
        res.status(404);
        res.send("Not Found");
      }
    });
  }
};


module.exports = productCtrl;