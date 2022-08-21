const { User } = require('../models/userModel');
const { Admin } = require('../models/adminModel');
const { AccountType } = require('./../models/accountTypeModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {validateUser} = require('./userController');
const Joi  = require('joi');

function validateAdmin(admin){ 
    const schema = { ...validateUser, 
        adminId: Joi.number().integer().required().label("Admin ID")};
    return Joi.object(schema).validate(admin);
}


const createAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let admin = await User.findOne({email: req.body.email});
    if(admin) return res.status(400).send('User already registered.');

    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "accountType", "adminId"];
    
    admin = new Admin(_.pick(req.body, properties));
    admin.accountType = await AccountType.findOne({name: "Admin"});
    
    const salt = await bcrypt.genSalt(parseInt(process.env.COST));
    admin.password = await bcrypt.hash(admin.password, salt);

    await admin.save();

    const token = admin.generateAuthToken();
    res.header('x-auth-token', token).status(200).send(_.pick(admin, ["_id"]));
};




const getAllAdmins = async (req, res) => {
    const admins = await Admin.find().select('-password');
    res.send(admins);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateAdmin = async (req, res) => {
    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "blogPosts"];
    
    const notValidEmail = await User
        .find({$and: [{"email": req.body.email}, {"_id": {$ne: req.body._id}}]})
        .count();
    if (notValidEmail) return res.status(400).send("User with given email already exists.");

    let admin = await Admin.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!admin) return res.status(404).send('Admin with the given ID was not found.');

    res.send(admin);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentAdmin = async (req, res) => {
    const admin = await Admin.findByIdAndRemove(req.body._id);

    if (!admin) return res.status(404).send('The user with the given ID was not found.');

    res.send(admin);
};


const getCurrentAdmin = async (req, res) => {
    const admin = await Admin.findById(req.user._id).select('-password');
    res.send(admin);
};


exports.createAdmin = createAdmin;
exports.getAllAdmins = getAllAdmins;
exports.updateAdmin = updateAdmin;
exports.deleteCurrentAdmin = deleteCurrentAdmin;
exports.getCurrentAdmin = getCurrentAdmin;
exports.validateAdmin = validateAdmin;