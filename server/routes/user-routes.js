var express = require('express');
var userRoute = express.Router();
var userController = require('../controllers/user-controller');
var auth = require('./../../auth.js');


var router = function(){

	userRoute.route('/signup')
		.post(function(req,res) {
			return userController.signup(req, res);
		});

	userRoute.route('/login')
		.post(function(req,res) {
			return userController.login(req, res);
		});

	userRoute.post('/logout',auth.checkToken,userController.logout);
	userRoute.post('/changePassword',auth.checkToken,userController.changePassword);
	userRoute.post('/updateProfile',auth.checkToken,userController.updateProfile)
		
    return userRoute;
}

module.exports = router;
