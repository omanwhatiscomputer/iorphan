const { User } = require('./../models/userModel');
const { Client } = require('./../models/clientModel');
const { AccountType } = require('./../models/accountTypeModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const { validateUser } = require('./userController');

function validateClient(client){ 
    const schema = {...validateUser,
                            clientId: Joi.number().required(),
                            creditCardNumber: Joi.string().label("Credit Card Number"),
                    };
    return Joi.object(schema).validate(client);
}

const createClient = async (req, res) => {
    const { error } = validateClient(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let client = await User.findOne({email: req.body.email});
    if(client) return res.status(400).send('User already registered.');

    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "clientId", "accountType"];
    client = new Client(_.pick(req.body, properties));
    client.accountType = await AccountType.findOne({name: "Client"});
    
    const salt = await bcrypt.genSalt(parseInt(process.env.COST));
    client.password = await bcrypt.hash(client.password, salt);

    await client.save();

    const token = client.generateAuthToken();
    res.header('x-auth-token', token).status(200).send(_.pick(client, ["_id"]));
};




const getAllClients = async (req, res) => {
    const clients = await Client.find().select('-password');
    res.send(clients);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateClient = async (req, res) => {
    const properties = ["prefix", "email", "password", "name",
                    "mobileNo", "bankAccountNo", "address", "dateOfBirth",
                    "nationality", "sex", "currency", "blogPosts"];
    
    const notValidEmail = await User
        .find({$and: [{"email": req.body.email}, {"_id": {$ne: req.body._id}}]})
        .count();
    if (notValidEmail) return res.status(400).send("User with given email already exists.");

    let client = await Client.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!client) return res.status(404).send('Client with the given ID was not found.');

    res.send(client);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentClient = async (req, res) => {
    
    const client = await Client.findByIdAndRemove(req.body._id);

    if (!client) return res.status(404).send('The user with the given ID was not found.');

    res.send(client);
};


const getCurrentClient = async (req, res) => {
    const client = await Client.findById(req.user._id).select('-password');
    res.send(client);
};


exports.createClient = createClient;
exports.getAllClients = getAllClients;
exports.updateClient = updateClient;
exports.deleteCurrentClient = deleteCurrentClient;
exports.getCurrentClient = getCurrentClient;

exports.validateClient = validateClient;