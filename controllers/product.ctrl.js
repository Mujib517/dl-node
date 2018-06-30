const Product = require('../models/product.model');
const productSvc = require('../services/product.svc');

const productCtrl = {

  get: (req, res) => {

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

  getById: async (req, res) => {
    try {
      let id = req.params.id;
      let product = await productSvc.getProduct(id);
      res.status(200).json(product);
    }
    catch (err) {
      res.status(500).send(err);
    }
  },

  save: async (req, res) => {
    try {
      let savedProduct = await productSvc.save(req.body);
      res.status(201);
      res.json(savedProduct);
    }
    catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  delete: async (req, res) => {
    let id = req.params.id;
    await productSvc.delete(id);
    res.status(204);
    res.send();
  },

  update: (req, res) => {
    let id = req.params.id;

    productSvc.update(id, req.body);
    res.status(204);
    res.send();
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