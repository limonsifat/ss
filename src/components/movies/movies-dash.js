import React from 'react';
import NavBar from './../navbar/navbar';
import cnService from './../../commonService.js';

class MoviesDashboard extends React.Component{

	constructor() {
		super();
		this.state = {
			movies: []
		}
	}

	componentDidMount(){
		cnService.simpleGet("movies/getMovies").then((res)=>{
			return res.data.data;
		}).then((data)=>{
			const contents = data.map((item,index) => {
				return (

					<div className=' movie-dash-div' key={index}>
						<img className='movie-dash-img' src={item.photoUrl} />
						<div className='movies-dash-p'>
							<p>MOVIE NAME: {item.title}</p>
							<p>YEAR: {item.year}</p>
							<p>DIRECTOR: {item.director}</p>
							<p>DESCRIPTION: {item.description}</p>
						</div>
					</div>
				)
			 })
			this.setState({movies:contents});
		});
	}


	gotoLogin(){
		window.location.href = '/login';
	}

	gotosignUp(){
		window.location.href = '/user-singup';
	}
	render(){
		return(
				<div>
					<div className=' movie-dash-div d-block'>
						<div className='container text-right'>
							<button className='btn btn-primary w-auto btn-sm mr-3' onClick={this.gotoLogin.bind(this)}>Login</button>
						<button className='btn btn-primary w-auto btn-sm' onClick={this.gotosignUp.bind(this)}>Sing Up</button>
						</div>
					</div>
					<h1>Movies</h1>
					{this.state.movies}
				</div>
		)
	}
}

export default MoviesDashboard;