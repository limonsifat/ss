import React from 'react';
import cnService from './../../commonService.js';

class SignUp extends React.Component{

	constructor(props){
		super(props);
		
		this.state = {
			user : {}
		}
	}

	handleValidation(){
		var user = this.state.user;
		var isValidationPass = true;
		if(!user['firstName']) isValidationPass = false; 
		if(!user['lastName']) isValidationPass = false; 
		if(!user['email']) isValidationPass = false; 
		if(!user['password']) isValidationPass = false; 
		return isValidationPass;
	}

	async registerUser(e){
		if(this.handleValidation()){
			let res = await cnService.post('user/signup',this.state.user);
				alert(res.data.message);
				window.location.href = '/login';
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
			<div className="container">
				<center><h1>Sign up Screen</h1></center>
		        <div className="text-right"><button type="submit" className=" btn btn-sm btn-primary w-auto mb-2 ">login</button></div>
			    <hr />
			    <div>
				    <label><b>First name</b></label>
				    <input type="text" onChange={this.handleChange.bind(this, "firstName")} placeholder="First name" />
			    </div>
			    <div>
				    <label><b>Last name</b></label>
				    <input type="text" onChange={this.handleChange.bind(this, "lastName")} placeholder="Last name" />
			    </div>

			    <div>
				    <label><b>Email</b></label>
				    <input type="text" onChange={this.handleChange.bind(this, "email")} placeholder="Email" />
			    </div>
			    <div>
				    <label><b>Password</b></label>
				    <input type="password" onChange={this.handleChange.bind(this, "password")} placeholder="password" />     
			    </div>
			     <div>
			    	<input type="submit" className="btn btn-primary" onClick={this.registerUser.bind(this)} value='Sing Up' />
			     </div>
		    </div>
		);
	}
}
export default SignUp;