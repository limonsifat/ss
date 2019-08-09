var jwt = require('jsonwebtoken');
var config = require('./config.js');
var session = require(__dirname + '/server/models/session.js');

exports.checkToken = (req,res,next)=>{
	var token = req.headers.token;
	if(!token){
		res.send({success : false, message : "No token provided"});
	}else{
		jwt.verify(token,config.secretKey, function(err, decoded) {
			if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });
			else{
				session.findOne({"token": token}).then((session) => {
					if(session!= null) next();
					else return res.send({ auth: false, message: 'Your token is expired or invalid' });
				})
				.catch(err => {
					return res.send({ succes: false, message: 'Internal server error' });
				});
			}
		});
	}
}