const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
// const joiObjectid = require("joi-objectid");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  isAdmin:{
    type:Boolean,
    default : true
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey")); // here we need to pass two arguments. first object second is private key...
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().max(50).min(3).required(),
    email: Joi.string().max(100).min(5).required().email(),
    password: Joi.string().max(250).min(5).required(),
  };
  return Joi.validate(user, schema);
}
exports.validate = validateUser;
exports.User = User;
