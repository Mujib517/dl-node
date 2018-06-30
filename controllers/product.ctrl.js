const Product = require('../models/product.model');

const productCtrl = {

  get: (req, res) => {

    // let pageIndex = req.params.pageIndex ? +req.params.pageIndex : 0;
    // let pageSize = req.params.pageSize ? +req.params.pageSize : 10;

    let pageIndex = +req.params.pageIndex || 0;
    let pageSize = +req.params.pageSize || 10;

    Product.count()
      .exec()
      .then(cnt => {
        let totalPages = Math.ceil(cnt / pageSize);

        let metadata = {
          count: cnt,
          totalPages: totalPages,
          hasPrevious: pageIndex > 0,
          hasNext: pageIndex < totalPages - 1
        };
        Product
          .find()
          .skip(pageIndex * pageSize)
          .limit(pageSize)
          .exec()
          .then(function (products) {

            var response = {
              metadata: metadata,
              data: products
            };

            res.status(200);
            res.json(response);

          })
          .catch(function (err) {
            res
              .status(500)
              .send("Internal Server Error");
          })
      });
  },

  getById: (req, res) => {

    let id = req.params.id;

    Product.findById(id)
      .exec()
      .then(function (product) {
        if (product) res.status(200).json(product);
        else res.status(404).send("Not Found");
      })
      .catch(function (err) {
        res.status(500)
          .send("Internal Server Error");
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