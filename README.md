# bcrypt
#password hashing with bcrypt done in nodejs and mysql
#jwt
npm i jsonwebtoken
https://bezkoder.com/wp-content/uploads/2019/10/in-depth-introduction-jwt-token-based-authentication.png
jwt.sign(payload, secretOrPrivateKey, [options, callback])
payload ...user
option.. expiry date
create a authenticateToken route 
jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo) // bar
});
