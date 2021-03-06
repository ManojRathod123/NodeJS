const mongoose = require("mongoose");
//const Joi = require("joi");
const Joi = require('joi-oid')


const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 50,
        },
        isGold: {
          type: String,
          required: true,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 10,
          maxlength: 12,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          maxlength: 50,
          minlength: 3,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 500,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateRentOut: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    // customerId: Joi.objectId(),
    // movieId: Joi.objectId(),
  });
  return Joi.validate(rental, schema);
}
exports.Rental = Rental;
exports.validate = validateRental;
