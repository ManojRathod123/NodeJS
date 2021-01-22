const winston = require("winston");

// The middleware function we have define here to catch error which is part of request processing pipeline
module.exports = function (err, req, res, next) { 
  winston.error(err.message, err); // winston.error is a hepler method

    // login error level...its depends on the priority..this are logging msg
    //error
    //warn
    //info  // store information like connected to mongodb...
    //verbose
    //debug
    //silly
    
  res.status(500).send("something Failed...!"); // 500:- internal server error...!
};




