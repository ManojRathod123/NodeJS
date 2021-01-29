const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token"); // we expect the json web token store in this header// only authorized person can get and post the data.
  if (!token)  return res.status(401).send("Access denied. No token provided");

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey")); // this step will varify the jwt code once verify it will decode the 
    req.user =  decode;
    console.log(decode)
    next();
  
  }
   catch (err) {
       res.status(400).send('invalid token...')
   }
}

module.exports = auth;