const { User } = require("../modules/user");
const bcrypt = require("bcrypt");
const Joi = require('joi');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");


router.post("/", async (req, res) => {
  console.log('manoj');
    // validation 
  const {error} = validate(req.body);
  if (error)  return res.status(400).send(error.details[0].message);

  // To login with registered email id..  
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

    // here we have bcrpt the password...Also we need to right password to login as auth.
  const validPassword = await bcrypt.compare(req.body.password, user.password); 
  if(!validPassword) return res.status(400).send("invalid email id or password");

  // jwt- (json-web-token)
  const token = user.generateAuthToken();
  res.send(token)
});

function validate(req) {
  const schema = {
    email: Joi.string().max(50).min(5).required().email(),
    password: Joi.string().max(50).min(5).required(),
  };
  return Joi.validate(req, schema);
}
module.exports = router;
