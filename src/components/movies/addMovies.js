import React from 'react';
import cnService from './../../commonService.js';
import NavBar from './../navbar/navbar';


class AddMovies extends React.Component{

	constructor(props){
		super(props);
		var user = JSON.parse(localStorage.getItem('user'));
		if(!user){
			window.location.href = '/login';
		}
		this.state = {
			category : [],	
			movie : {}
		}
	}

	componentDidMount(){
		this.serverRequest = cnService.get("category/getAllCategories").then((res)=>{
			return res.data.data;
		}).then((data)=>{
			const contents = data.map((item,index) => {
				return (<option key={index} value={item._id}>{item.categoryName}</option>)
			 })
			this.setState({category:contents});
		});
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}


	handleValidation(){
		var movie = this.state.movie;
		var isValidationPass = true;
		if(!movie['categoryId']) isValidationPass = false; 
		if(!movie['title']) isValidationPass = false; 
		if(!movie['year']) isValidationPass = false; 
		if(!movie['director']) isValidationPass = false; 
		if(!movie['description']) isValidationPass = false; 
		if(!movie['photoUrl']) isValidationPass = false; 
		return isValidationPass;
	}

	async addMovies(e){
		console.log(this.state.movie);
		if(this.handleValidation()){
			let res = await cnService.post('movies/addMovie',this.state.movie);
				alert(res.data.message);
				window.location.href = '/view-movies'
		}else{
			alert('Please fill all the required fields')
		}
	}

	handleChange(value,e){
		var movie = this.state.movie;
		movie[value] = e.target.value;
		this.setState({movie})
	}

	render(){
		return(
			<div className="pag-wrapper">
				<NavBar />
				<div className="p-4 main-content">
				  	<h2 className="text-center mb-5">Add Movie</h2>
				  	<div className="contianer-fluid pt-3">
				  		<div className="row">
				  			<div className="col-md-8 offset-md-2">
				  				<div className="row">
				  					<div className="col-md-6 form-group">
				  						<label><b>Choose category</b></label>
				  						<select onChange={this.handleChange.bind(this, "categoryId")} className="form-control">
				  							<option>---select----</option>
				  							{this.state.category}
				  						</select>
				  					</div>
				  					<div className="col-md-6 form-group">
				  						<label><b>Movie Title</b></label>
				  						<input type="text" placeholder="Enter title" onChange={this.handleChange.bind(this, "title")} className="form-control" />
				  					</div>
				  					<div className="col-md-6 form-group">
				  						<label><b>year</b></label>
				  						<input type="text" onChange={this.handleChange.bind(this, "year")} placeholder="Enter year" className="form-control" />
				  					</div> 
				  					<div className="col-md-6 form-group">
				  						<label><b>director</b></label>
				  						<input type="text" onChange={this.handleChange.bind(this, "director")} placeholder="Enter director name" className="form-control" />
				  					</div>
				  					<div className="col-md-6 form-group">
				  						<label><b>Description</b></label>
				  						<input type="text" onChange={this.handleChange.bind(this, "description")} placeholder="Enter description" className="form-control" />
				  					</div>
				  					<div className="col-md-6 form-group mb-5">
				  						<label><b>photoUrl</b></label>
				  						<input type="text" onChange={this.handleChange.bind(this, "photoUrl")} placeholder="Enter photo URL" className="form-control" />
				  					</div>
				  					<div className="col-md-6 offset-md-3 form-group">
				  						<button type="submit" onClick={this.addMovies.bind(this)} className="btn btn-primary btn-block" >Add Movie</button>
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
export default AddMovies;