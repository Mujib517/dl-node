const productSvc = require('../services/product.svc');

const productCtrl = {

  get: async (req, res) => {

    let pageIndex = +req.params.pageIndex || 0;
    let pageSize = +req.params.pageSize || 10;

    let sort = req.query.sort || 'lastUpdated';
    let direction = req.query.direction;

    let cnt = await productSvc.getCount();
    let products = await productSvc.get(pageIndex, pageSize, sort, direction);

    let totalPages = Math.ceil(cnt / pageSize);

    let metadata = {
      count: cnt,
      totalPages: totalPages,
      hasPrevious: pageIndex > 0,
      hasNext: pageIndex < totalPages - 1
    };



    let response = {
      metadata: metadata,
      data: products
    };

    res.status(200);
    res.json(response);
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

  patch: async (req, res) => {

    let id = req.params.id;
    delete req.body._id;

    await productSvc.patch(id, req.body);
    res.status(204).send();
  }
};


module.exports = productCtrl;