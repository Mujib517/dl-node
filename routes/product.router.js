var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');

router.get('/products', productCtrl.get);
router.get('/products/:id', productCtrl.getById);

module.exports = router;