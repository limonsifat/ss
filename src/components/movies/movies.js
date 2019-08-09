import React from 'react';
import NavBar from './../navbar/navbar';
import cnService from './../../commonService.js';

class Movies extends React.Component{

	constructor() {
		super();
		var user = JSON.parse(localStorage.getItem('user'));
		if(!user){
			window.location.href = '/login';
		}
		this.state = {
			movies: []
		}
	}

	componentDidMount(){
		this.serverRequest = cnService.get("movies/getMovies").then((res)=>{
			return res.data.data;
		}).then((data)=>{
			const contents = data.map((item,index) => {
				//change the title and location key based on your API
				return (<tr key={index}>
						<td>{item.title}</td> 
						<td>{item.year}</td>
						<td>{item.director}</td>
						<td>{item.description}</td>
						<td>{item.photoUrl}</td>
						<td><button className="btn" onClick={this.updateMovie.bind(this,item)}><i className="fa fa-edit"></i></button></td>
						<td><button className="btn" onClick={this.deleteMovie.bind(this,item._id)}><i className="fa fa-trash"></i></button></td>
		  			</tr>)
			 })
			this.setState({movies:contents});
		});
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	deleteMovie(id,event){
		this.serverRequest = cnService.post("movies/deleteMovie",{id : id}).then((res)=>{
			alert("Movie delete successfuly")
			this.componentDidMount();	
		}).catch((error)=>{
			console.log(error);
		})
	}

	updateMovie(obj){
		localStorage.setItem('movieDetail',JSON.stringify(obj));
		window.location.href = '/update-movies';
	}

	gotoaddMovie(){
		window.location.href = '/add-movies';
	}

	render(){
		return(
			<div className="pag-wrapper">
				<NavBar />
				<div className="container-fluid main-content">
					<h2  className="text-center">View Movies</h2>
					<div className="text-right">
						<button type="submit" className=" btn btn-sm btn-primary w-auto mb-2 mr-3 " onClick={this.gotoaddMovie.bind()}>Add Movies</button>
					</div>
					<div className="table-responsive">
						<table className="table table-stripped mTable" id="dataTable">
	    				<thead>
		    				<tr>
			    				<th>Name</th>
			    				<th>Year</th>
			    				<th>Director</th>
			    				<th>Description</th>
			    				<th>Photo Url</th>
			    				<th>Edit</th>
			    				<th>Delete</th>
		    				</tr>
	    				</thead>
	    				<tbody>
		    					{this.state.movies}
	    				</tbody>
    				</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Movies;