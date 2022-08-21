const { User } = require('../models/userModel');
const { Consultant } = require('../models/consultantModel');
const { AccountType } = require('./../models/accountTypeModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const authorization = require('./../middlewares/authorization');
const Joi = require('joi');
const {validateUser} = require('./userController');


function validateConsultant(consultant){ 
    const schema = { ...validateUser, organization: Joi.string() };
    return Joi.object(schema).validate(consultant);
}



const createConsultant = async (req, res) => {
    const { error } = validateConsultant(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let consultant = await User.findOne({email: req.body.email});
    if(consultant) return res.status(400).send('User already registered.');

    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "accountType"];
    
    consultant = new Consultant(_.pick(req.body, properties));
    consultant.accountType = await AccountType.findOne({name: "Consultant"});
    
    const salt = await bcrypt.genSalt(parseInt(process.env.COST));
    consultant.password = await bcrypt.hash(consultant.password, salt);

    await consultant.save();

    const token = consultant.generateAuthToken();
    res.header('x-auth-token', token).status(200).send(_.pick(manager, ["_id"]));
};




const getAllConsultants = async (req, res) => {
    const consultants = await Consultant.find().select('-password');
    res.send(consultants);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateConsultant = async (req, res) => {
    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "blogPosts"];
    
    const notValidEmail = await User
        .find({$and: [{"email": req.body.email}, {"_id": {$ne: req.body._id}}]})
        .count();
    if (notValidEmail) return res.status(400).send("User with given email already exists.");

    let consultant = await Consultant.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!consultant) return res.status(404).send('Consultant with the given ID was not found.');

    res.send(consultant);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentConsultant = async (req, res) => {
    const consultant = await Consultant.findByIdAndRemove(req.body._id);

    if (!consultant) return res.status(404).send('The user with the given ID was not found.');

    res.send(consultant);
};


const getCurrentConsultant = async (req, authorization, res) => {
    const consultant = await Consultant.findById(req.user._id).select('-password');
    res.send(consultant);
};


exports.createConsultant = createConsultant;
exports.getAllConsultants = getAllConsultants;
exports.updateConsultant = updateConsultant;
exports.deleteCurrentConsultant = deleteCurrentConsultant;
exports.getCurrentConsultant = getCurrentConsultant;

exports.validateConsultant = validateConsultant;