const Joi = require('joi');
const { User } = require('../models/userModel');
const _ = require('lodash');
const mongoose = require('mongoose');

const validateUser = {
  prefix: Joi.string().max(10),
  email: Joi.string().email({minDomainSegments: 1,}).label("Email").required().max(100),
  password: Joi.string().required().label("Password").min(5).max(255),
  name: Joi.object().keys({
    firstName: Joi.string().required().max(100).label("First name"),
    nickname: Joi.string().required().max(100).label("Nickname"),
    lastName: Joi.string().required().max(100).label("Last name"),
  }),
  mobileNo: Joi.string().required().max(15).label("Mobile Number"),
  bankAccountNo: Joi.string().required().label("Bank Account Number").max(13),
  address: Joi.object().keys({
    addressLine1: Joi.string().max(255).required().label("Address line 1"),
    addressLine2: Joi.string().max(255).label("Address line 2"), 
    city: Joi.string().max(25).required().label("City"), 
    state: Joi.string().max(25).required().label("State/Province"), 
    zipCode: Joi.string().required().label("Zip Code"), 
    country: Joi.string().max(25).required().label("Country"),
  }),
  dateOfBirth: Joi.date().required().label("Date of Birth"),
  nationality: Joi.string().required().max(25).label("Nationality"),
  sex: Joi.string().required().label("Sex"),
  currency: Joi.string().label("currency"),
  transactions: Joi.array(),
  profilePhoto: Joi.string(),
};

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
};


const updateCurrentUser = async (req, res) => {
  const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "blogPosts"];
  
  
  const notValidEmail = await User
      .find({$and: [{"email": req.body.email}, {"_id": {$ne: req.body._id}}]})
      .count();
  if (notValidEmail) return res.status(400).send("User with given email already exists.");

  let user = await User.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
  if (!user) return res.status(404).send('User with the given ID was not found.');

  res.send(user);
};

  exports.validateUser = validateUser;
  exports.updateCurrentUser = updateCurrentUser;
  exports.getCurrentUser = getCurrentUser;