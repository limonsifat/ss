import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/';
const user = JSON.parse(localStorage.getItem("user"));

export default{
	post : function(url,obj){
		return axios.post(baseUrl+url,obj,{ headers: {"token" :user.token} });
	},
	loginPost : function(url,obj){
		return axios.post(baseUrl+url,obj);
	},
	get : function(url){
		return axios.get(baseUrl+url,{ headers: {"token" :user.token} });
	},
	simpleGet : function(url){
		return axios.get(baseUrl+url);
	},
	logOut : function(){
		var user = JSON.parse(localStorage.getItem('user'));
		axios.post(baseUrl+"user/logout",{id : user.id}).then((res)=>{
			
			localStorage.clear();
			window.location.href = '/login';
		}).catch((error)=>{
			console.log(error);
		})
	}
}