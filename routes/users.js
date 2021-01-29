const { User, validate } = require("../modules/user");
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", auth, async (req, res) => {
  const user = await User.find().select('-password');
  res.send(user);
});

router.post("/", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user already register
  let user = await User.findOne({ email: req.body.email }); // if user trying to login with same email that mean 
  if (user) return res.status(400).send("user already registered");

  // Add new user // here we have a lodash with _ .pick method to pick require
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10); // 10 stand for number of rounds we want to generate the algoritham.
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user, ["id", "name", "email"]));
});

module.exports = router;
