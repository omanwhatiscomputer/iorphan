const { User } = require('../models/userModel');
const { Manager } = require('../models/managerModel');
const { AccountType } = require('./../models/accountTypeModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const {validateUser} = require('./userController');
const authorization = require('./../middlewares/authorization');

function validateManager(manager){ 
    const schema = { ...validateUser, organization: Joi.string()};
    return Joi.object(schema).validate(manager);
}


const createManager = async (req, res) => {
    const { error } = validateManager(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let manager = await User.findOne({email: req.body.email});
    if(manager) return res.status(400).send('User already registered.');

    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "accountType"];
    
    manager = new Manager(_.pick(req.body, properties));
    manager.accountType = await AccountType.findOne({name: "Manager"});
    
    const salt = await bcrypt.genSalt(parseInt(process.env.COST));
    manager.password = await bcrypt.hash(manager.password, salt);

    await manager.save();

    const token = manager.generateAuthToken();
    res.header('x-auth-token', token).status(200).send(_.pick(manager, ["_id"]));
};




const getAllManagers = async (req, res) => {
    const managers = await Manager.find().select('-password');
    res.send(managers);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateManager = async (req, res) => {
    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "blogPosts"];
    
    const notValidEmail = await User
        .find({$and: [{"email": req.body.email}, {"_id": {$ne: req.body._id}}]})
        .count();
    if (notValidEmail) return res.status(400).send("User with given email already exists.");

    let manager = await Manager.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!manager) return res.status(404).send('Manager with the given ID was not found.');

    res.send(manager);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentManager = async (req, res) => {
    const manager = await Manager.findByIdAndRemove(req.body._id);

    if (!manager) return res.status(404).send('The user with the given ID was not found.');

    res.send(manager);
};


const getCurrentManager = async (req, authorization, res) => {
    const manager = await Manager.findById(req.user._id).select('-password');
    res.send(manager);
};


exports.createManager = createManager;
exports.getAllManagers = getAllManagers;
exports.updateManager = updateManager;
exports.deleteCurrentManager = deleteCurrentManager;
exports.getCurrentManager = getCurrentManager;

exports.validateManager = validateManager;