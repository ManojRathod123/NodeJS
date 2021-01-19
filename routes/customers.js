const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {Customer, validate} =  require('../modules/customer')

// create router....
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  // validate data...
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // post data
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  // send data
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // validate data...
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // find data by id and update it
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // send data....
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
