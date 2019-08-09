var Common = require(__dirname + '/common-controller');
var Category = require(__dirname + '/../models/category.js');

exports.addCategory = function (request, response) {
		Category.create(request.body)
	   	.then(() => {
    		common.sendResponseBack(response, 'OK', 'Created successfully!', null);	
	   	})
	   	.catch(err => {
    		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
	   });

}

exports.deleteCategory = function (request, response) {
    
    Category.deleteOne({ '_id': request.body.id }).then((data) => {
		common.sendResponseBack(response, 'OK', 'successfully Deleted!', null);	
   	})
   	.catch(err => {
		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
   	});
}

exports.getAllCategories = function (request, response) {
	Category.find().then((categoryData) => {
		return common.sendResponseBack(response, 'OK', 'featch successfully!', categoryData);	
   	})
   	.catch(err => {
		return common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
   	});
}

exports.updateCategories = function (request, response) {
	var id = { '_id': request.body.id };
  	var updateValue = { $set: {categoryName: request.body.categoryName, description: request.body.description } };
	Category.updateOne(id, updateValue).then(() => {
		common.sendResponseBack(response, 'OK', 'Update successfully!', null);	
   	})
   	.catch(err => {
		common.sendResponseBack(response, 'FAIL', 'Ineternal server error!', null);
   	});
}
