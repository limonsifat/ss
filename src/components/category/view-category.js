import React from 'react';
import NavBar from './../navbar/navbar';
import cnService from './../../commonService.js';

class Category extends React.Component{

	constructor() {
		var user = JSON.parse(localStorage.getItem('user'));
		if(!user){
			window.location.href = '/login';
		}
		super();
		this.state = {
			category: []
		}
	}

	componentDidMount(){
		this.serverRequest = cnService.get("category/getAllCategories").then((res)=>{
			return res.data.data;
		}).then((data)=>{
			var contents;
			if(data){
				contents = data.map((item,index) => {
					return (
						<tr key={index}>
							<td>{item.categoryName}</td> 
							<td>{item.description}</td>
							<td>{item.createdAt}</td>
							<td><button className="btn" onClick={this.updateCategory.bind(this,item)}><i className="fa fa-edit"></i></button></td>
							<td><button className="btn" onClick={this.deleteCategory.bind(this,item._id)}><i className="fa fa-trash"></i></button></td>
						</tr>	
					)
				 })
			}else{
				contents = <tr>No record found!</tr>
			}
			this.setState({category:contents});
		});
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	deleteCategory(id,event){
		this.serverRequest = cnService.post("category/deleteCategory",{id : id}).then((res)=>{
			alert("Category delete successfuly")
			this.componentDidMount();	
		}).catch((error)=>{
			console.log(error);
		})
	}

	updateCategory(obj){
		localStorage.setItem('categoryDetail',JSON.stringify(obj));
		window.location.href = '/update-category';
	}

	gotoaddCategory(){
		window.location.href = '/add-category';
	}

	render(){
		return(
			<div className="pag-wrapper">
				<NavBar />
				<div className="container-fluid main-content">
					<h2 className="text-center">View Category</h2>
					<div className="text-right">
						<button type="submit" className=" btn btn-sm btn-primary w-auto mb-2 mr-3 " onClick={this.gotoaddCategory.bind()}>Add Category</button>
					</div>
					<div className="table-responsive">
						<table className="table table-stripped" id="dataTable">
		    				<thead>
			    				<tr>
				    				<th>Category Name</th>
				    				<th>Description</th>
				    				<th>Created at</th>
				    				<th>Edit</th>
				    				<th>Delete</th>
			    				</tr>
		    				</thead>
		    				<tbody>
			    					{this.state.category}
		    				</tbody>
    					</table>
					</div>					
				</div>
			</div>
		)
	}
}

export default Category;