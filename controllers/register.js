var connection = require('../config');
var bcrypt = require('bcryptjs');
module.exports.register=(req,res)=>{

    var username = req.body.username

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash password in your Database.
    
    connection.query(`INSERT INTO users (username,password) values('${username}','${hash}')`,(error, results, fields)=> {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
});
}