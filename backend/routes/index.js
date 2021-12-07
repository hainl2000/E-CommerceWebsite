var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index');
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
// var bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');

// const AccountModel = require('../models/user');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.post('/login',indexController.Login);
router.post('/signup',indexController.Signup);
router.get('/getListCategories',categoryController.getListCategories);
// router.post('signout',indexController.Signout);
router.get('/getAllActiveProducts',productController.getAllActiveProducts);
router.get('/getListProductsByCategory',productController.getListProductsByCategory);


module.exports = router;