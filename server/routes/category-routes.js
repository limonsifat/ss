var express = require('express');
var categoryRoute = express.Router();
var categoryController = require('../controllers/category-controller');
var auth = require('./../../auth.js');

var router = function(){

	/*CATEGORY APIS*/
	categoryRoute.post('/addCategory',auth.checkToken,categoryController.addCategory);
	categoryRoute.post('/deleteCategory',auth.checkToken,categoryController.deleteCategory);
	categoryRoute.get('/getAllCategories',auth.checkToken,categoryController.getAllCategories);
	categoryRoute.post('/updateCategories',auth.checkToken,categoryController.updateCategories);

    return categoryRoute;
}

module.exports = router;
