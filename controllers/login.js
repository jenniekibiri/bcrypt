var jwt=require('jsonwebtoken');
var connection = require('./../config');
var bcrypt = require('bcryptjs')
module.exports.login=function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   connection.query(`select * from users where username = '${username}'`, (err,results)=>{
     if(err){
       res.json({
         status:false,
         message:'there are errors with the query'
       });
     }else{
       if(results.length>0){
         bcrypt.compare(password,results[0].password,(req,ress)=>{
if(!ress){
  res.json({
    status:false,
  message:"email and password dont match"
});
}else{
  
  var token = jwt.sign({username:results[0].username},process.env.SECRET_KEY,{
    expiresIn:600
  });
  res.json({
    status:true,
  token:token,
  username:username
});
}
         })
         
       }else{
        res.json({
          status:false,
        message:"Email does not exits",
        

      });
       }
     }
   })
}