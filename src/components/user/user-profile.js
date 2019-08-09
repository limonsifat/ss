import React from 'react';
import cnService from './../../commonService.js';
import NavBar from './../navbar/navbar';


class SignUp extends React.Component{

	constructor(props){
		super(props);
		var user = JSON.parse(localStorage.getItem('user'));
		if(!user){
			window.location.href = '/login';
		}

		this.state = {
			user : {
				firstName :user.firstName,
				lastName: user.lastName,
				email: user.email,
			}
		}
	}

	handleValidation(){
		var user = this.state.user;
		var isValidationPass = true;
		if(!user['firstName']) isValidationPass = false; 
		if(!user['lastName']) isValidationPass = false; 
		if(!user['email']) isValidationPass = false; 
		if(!user['oldPassword']) isValidationPass = false; 
		if(!user['newPassword']) isValidationPass = false; 
		return isValidationPass;
	}

	async updateUser(e){
		if(this.handleValidation()){
			let res = await cnService.post('user/updateProfile',this.state.user);
				if(res.data.message === 'Incorrect email or password!'){
					alert(res.data.message);	
				}else{
					alert(res.data.message);
					localStorage.clear();
					window.location.href = '/login';
				}
		}else{
			alert('Please fill all the required fields')
		}
	}

	handleChange(value,e){
		var user = this.state.user;
		user[value] = e.target.value;
		this.setState({user})
	}

	render(){
		return(
			<div className="pag-wrapper">
				<NavBar />
				<div className="container-fluid main-content">
					<center><h1>Sign up Screen</h1></center>
			        <div className="text-right">
			        	<button type="submit" className=" btn btn-sm btn-primary w-auto mb-2 ">login</button>
			        </div>
				    <hr />
				    <div className="row mx-0">
			    	    <div className="col-md-6">
			    		    <label><b>First name</b></label>
			    		    <input value={this.state.user.firstName} className='form-control'  type="text" onChange={this.handleChange.bind(this, "firstName")} placeholder="First name" />
			    	    </div>
			    	    <div  className="col-md-6">
			    		    <label><b>Last name</b></label>
			    		    <input value={this.state.user.lastName} className='form-control' type="text" onChange={this.handleChange.bind(this, "lastName")} placeholder="Last name" />
			    	    </div>
			    	    <div className="col-md-6">
			    		    <label><b>Email</b></label>
			    		    <input value={this.state.user.email} className='form-control' type="text" onChange={this.handleChange.bind(this, "email")} placeholder="Email" />
			    	    </div>
			    	    <div className="col-md-6">
			    		    <label><b>Old Password</b></label>
			    		    <input className='form-control' type="password" onChange={this.handleChange.bind(this, "oldPassword")} placeholder="password" />     
			    	    </div>
			    	    <div className="col-md-6">
			    		    <label><b>New Password</b></label>
			    		    <input className='form-control' type="password" onChange={this.handleChange.bind(this, "newPassword")} placeholder="password" />     
			    	    </div>
			    	    <div className="col-md-6 mt-auto">
			    	    	<input  type="submit" className="btn mb-4 btn-block btn-primary" onClick={this.updateUser.bind(this)} value='Submit' />
			    	    </div>
				    </div>
				</div> 
		    </div>
		);
	}
}
export default SignUp;