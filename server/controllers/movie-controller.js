var Common = require(__dirname + '/common-controller');
var movies = require(__dirname + '/../models/movies.js');
var categories = require(__dirname + '/../models/category.js');

exports.addMovie = function (request, response) {

    movies.create(request.body)
	   	.then(() => {
    		common.sendResponseBack(response, 'OK', 'add Movie successfully!', null);	
	   	})
	   	.catch(err => {
    		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
	});
}

exports.updateMovie = function (request, response) {

   	var id = { '_id': request.body.id };
  	var updateValue = { $set: {categoryId: request.body.categoryId, title: request.body.title, year: request.body.year, director: request.body.director, description: request.body.description, photoUrl: request.body.photoUrl } };
	movies.updateOne(id, updateValue).then(() => {
		common.sendResponseBack(response, 'OK', 'Update successfully!', );	
   	})
   	.catch(err => {
		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
   	});
}

exports.deleteMovie = function (request, response) {

    movies.deleteOne({ '_id': request.body.id }).then((data) => {
		common.sendResponseBack(response, 'OK', 'successfully Deleted!', null);	
   	})
   	.catch(err => {
		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
   	});
}

exports.getMovies = function (request, response) {
	movies.find().then((moviesData) => {
		common.sendResponseBack(response, 'OK', 'featch successfully!', moviesData);	
   	})
   	.catch(err => {
		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
   	});
}