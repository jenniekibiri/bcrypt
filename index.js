var express=require("express");
var bodyParser=require('body-parser');
var bcrypt = require('bcryptjs');
var path = require('path')
var jwt  = require('jsonwebtoken')
var app = express();
process.env.SECRET_KEY="thisismysecretkey";

var registerController=require('./controllers/register');
var loginController=require('./controllers/login');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//va;idation middle ware
function authenticateToken(req,res,next){
//get the jwt access token from the request

var token =req.body.token || req.headers['token'];
if(token){
    jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
if(err){
    console.log(decoded)
res.status(500).send('token is invalid')
}else{
    next();

}
    })
}else{
    res.send('please send a token')
}
}
//protected route 
app.get('/protected',authenticateToken,(req,res)=>{
    res.send('token verified')
})
/* route to handle login and registration */
app.post('/register',registerController.register);
app.post('/login',loginController.login);

app.get('/register',(req,res)=>{
	res.sendFile(path.join(__dirname + '/src/register.html'));
})
app.get('/login',(req,res)=>{
	res.sendFile(path.join(__dirname + '/src/index.html'));
})
app.listen(5000);
