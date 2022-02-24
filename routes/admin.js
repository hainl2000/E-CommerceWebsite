var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const userController = require('../controllers/user');
// const adminValidation = require('../validate/validateAccount');

// const jwt = require('jsonwebtoken');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/product/create',productController.createProduct);
router.post('/product/update',productController.updateProduct);
router.post('/product/delete',productController.deleteProduct);
router.post('/category/create',categoryController.createCategory);


module.exports = router;