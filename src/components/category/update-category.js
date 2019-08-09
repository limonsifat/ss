import React from 'react';
import cnService from './../../commonService.js';
import NavBar from './../navbar/navbar';


class UpdateCategory extends React.Component{

	constructor(props){
		super(props);
		var user = JSON.parse(localStorage.getItem('user'));
		if(!user){
			window.location.href = '/login';
		}
		var cat = JSON.parse(localStorage.getItem('categoryDetail'))
		console.log(cat);
		this.state = {
			category : {
				id : cat._id,
				categoryName : cat.categoryName,
				description : cat.description,
			},	
		}
	}

	handleValidation(){
		var category = this.state.category;
		var isValidationPass = true;
		if(!category['categoryName']) isValidationPass = false; 
		if(!category['description']) isValidationPass = false; 
		return isValidationPass;
	}

	async updateCategory(e){
		if(this.handleValidation()){
			let res = await cnService.post('category/updateCategories',this.state.category);
				alert(res.data.message);
				window.location.href = '/view-category'
		}else{
			alert('Please fill all the required fields')
		}
	}

	handleChange(value,e){
		var category = this.state.category;
		category[value] = e.target.value;
		this.setState({category})
	}

	render(){
		return(
			<div className="pag-wrapper">
				<NavBar />
				<div className="p-4 main-content">
					<h2 className="text-center mb-5">Update Category</h2>
					<div className="contianer-fluid pt-3">
					  <div className="row">
						<div className="col-md-8 offset-md-2">
						  <div className="row">
							<div className="col-md-6 form-group">
							  <label><b>Name</b></label>
							  <input value ={this.state.category.categoryName} onChange={this.handleChange.bind(this, "categoryName")} type="text" className="form-control" placeholder="Enter Category name" />
							</div>
							<div className="col-md-6 form-group">
							  <label><b>Description</b></label>
							  <input value ={this.state.category.description} onChange={this.handleChange.bind(this, "description")} type="text" placeholder="Enter Description" className="form-control" />
							</div>
							<div className="col-md-6 form-group offset-md-3 pt-4">
							  <button onClick={this.updateCategory.bind(this)} type="submit" className="btn btn-primary btn-block">Update category</button>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				</div>
			</div>
		);
	}
}
export default UpdateCategory;