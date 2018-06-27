const products = [{ id: 1, brand: "Nokia", model: "X6", price: 250, inStock: true },
{ id: 2, brand: "Samsung", model: "Galxy S8", price: 250, inStock: true },
{ id: 3, brand: "Samsung", model: "Galaxy S9", price: 750, inStock: false }];



const productCtrl = {

  get: (req, res) => {
    res.status(200);
    res.json(products);
  },

  getById: (req, res) => {

    let id = +req.params.id;
    let product;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        product = products[i];
      }
    }

    if (product) {
      res.status(200);
      res.json(product);
    }
    else {
      res.status(404); //Not found
      res.send("Not Found");
    }


  },

  save: (req, res) => {

    products.push(req.body);

    res.status(201); //Created
    res.send(req.body);
  },

  delete: (req, res) => {
    let id = +req.params.id;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
      }
    }

    res.status(204);  //No Content
    res.send();
  },

  update: (req, res) => {
    let product = req.body;
    let id = +req.params.id;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i].brand = product.brand;
        products[i].model = product.model;
        products[i].price = product.price;
        products[i].inStock = product.inStock;
      }
    }

    res.status(204);
    res.send();
  }

};


module.exports = productCtrl;