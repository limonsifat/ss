var express = require('express');
var movieRoute = express.Router();
var movieController = require('../controllers/movie-controller');
var auth = require('./../../auth.js');

var router = function(){

	/*MOVIE APIS*/
	movieRoute.post('/addMovie',auth.checkToken,movieController.addMovie)
	movieRoute.post('/updateMovie',auth.checkToken,movieController.updateMovie)
	movieRoute.post('/deleteMovie',auth.checkToken,movieController.deleteMovie)
	movieRoute.get('/getMovies',movieController.getMovies)

    return movieRoute;
}

module.exports = router;
