const config = require("config");

module.exports = function(){
    // to make sure environment variable is start.
if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    
  } 
}