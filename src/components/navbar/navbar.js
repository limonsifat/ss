import React from 'react';
import './navBar.css'
import cnService from './../../commonService.js';


class NavBar extends React.Component{
	render(){
		return(
			<div className="sidebar">
				<div className="sideHeader">
					<h5>NODE MONGO</h5>
				</div>
				<div className="sideItem">
					<ul>
						<li>
							<a href='/view-category'>View Category</a>
						</li>

						<li>
							<a href='/view-movies'>View Movies</a>
						</li>

						<li>
							<a href='/user-profile'>Profile</a>
						</li>

						<li>
							<a onClick={cnService.logOut.bind()}>Sign Out</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}


export default NavBar