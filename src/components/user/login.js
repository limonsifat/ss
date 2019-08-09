import React from 'react';
import Logo from './../../assets/images/img-signup.png';
import cnService from './../../commonService.js';


class Login extends React.Component{

	constructor(props){
		var user = JSON.parse(localStorage.getItem('user'));
		if(user){
			window.location.href = '/view-movies';
		}
		super(props);
		this.state = {
			fields : {}
		}
	}

	handleValidation(){
		var fields = this.state.fields;
		var errors = {};
		var isValidationPass = true;

		if(!fields['email']){
			isValidationPass = false;
		}
		if(!fields['password']){
			isValidationPass = false;
		}
		
		this.setState({errors});
		return isValidationPass;
	}

	async contactSubmit(e){
		e.preventDefault();
		if(this.handleValidation()){
			let res = await cnService.loginPost('user/login',this.state.fields);
			if(!res.data.data){
				alert(res.data.message);
			}else{
				localStorage.setItem('user',JSON.stringify(res.data.data));
				window.location.href = '/view-movies';
			}
		}else{
			alert('Please fill all the required fields')
		}
	}

	handleChange(value,e){
		var fields = this.state.fields;
		fields[value] = e.target.value;
		this.setState({fields})
	}

	render(){
		return(
			
			<div>
				<center><h2>Login Form</h2></center>
				<div className="imgcontainer">
					<img src={Logo} alt="Avatar" className="avatar" />
				</div>

				<div className="container">
					<div>
					<div className="col-md-6 offset-md-3">
						<label><b>Email</b></label>
						<input type="text" onChange={this.handleChange.bind(this, "email")} className="form-control" placeholder="Enter email" id="email" name="email" required	/>
					</div>
					<div className="col-md-6 offset-md-3">
						<label><b>Password</b></label>
						<input type="password" onChange={this.handleChange.bind(this, "password")} className="form-control" placeholder="Enter Password" id="psw" name="pwd" required />
					</div>
					<div className="col-md-6 offset-md-3">
						<button className="btn btn-success mb-2" onClick={this.contactSubmit.bind(this)} type="button" >Login</button>
						<button className="btn btn-success" type="button" >Sign Up</button>
					</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;