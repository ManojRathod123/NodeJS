const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 250,
    },
  })
);

function validateMovie(movie) {  // The joi schema is what the client sends us like input and request.
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(1000).required(),
    dailyRentalRate: Joi.number().min(0).max(250).required(),
  };
  return Joi.validate(movie, schema);
};

exports.validate=validateMovie;
exports.Movie = Movie;