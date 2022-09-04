
const { Organization } = require('../models/organizationModel');
const _ = require('lodash');
const Joi = require('joi');

function validateOrganization(organization){
    const schema = {
        name: Joi.string().min(2).max(32).required(),
        location: Joi.object().keys({
            latitude: Joi.number().integer(),
            longitude: Joi.number().integer(),
        }),
        address: Joi.object().keys({
            addressLine1: Joi.string().max(255).required().label("Address line 1"),
            addressLine2: Joi.string().max(255).label("Address line 2"), 
            city: Joi.string().max(25).required().label("City"), 
            state: Joi.string().max(25).required().label("State/Province"), 
            zipCode: Joi.string().required().label("Zip Code"), 
            country: Joi.string().max(25).required().label("Country"),
        }),
        description: Joi.string().label("Description").required(),
        logo: Joi.string().label('Logo'),
        contacts: Joi.object().keys({
            email: Joi.string().email({minDomainSegments: 1,}).label("Email").required().max(100),
            phoneNumber_1: Joi.string().required().max(15).label("Mobile Number 1"),
            phoneNumber_2: Joi.string().max(15).label("Mobile Number 2"),
            website: Joi.string().max(255).label("Website"),
        }),
        bankAccountNo: Joi.string().required().label("Bank Account Number").max(13),
    };
    return Joi.object(schema).validate(organization);
}

const createOrganization = async (req, res) => {
    const { error } = validateOrganization(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let organization = await Organization.findOne({name: req.body.name});
    if(organization) return res.status(400).send('The given name has already been registered.');

    const properties = ["name", "contacts", "location", "description",
                    "address", "bankAccountNo", "logo"];
    
    organization = new Organization(_.pick(req.body, properties));
    await organization.save();

    res.status(200).send(organization);
};


const getAllOrganizations = async (req, res) => {
    const organizations = await Organization.find();
    res.send(organizations);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateOrganization = async (req, res) => {
    const properties = ["name", "contacts", "location", "description",
                    "address", "bankAccountNo","hasManager", "manager"];
    
    const notValidName = await Organization
        .find({$and: [{"name": req.body.name}, {"_id": {$ne: req.body._id}}]})
        .count();
    if (notValidName) return res.status(400).send("The given name has already been registered");

    let organization = await Organization.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!organization) return res.status(404).send('Organization with the given ID was not found.');

    res.send(organization);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentOrganization = async (req, res) => {
    const organization = await Organization.findByIdAndDelete( req.body._id );

    if (!organization) return res.status(404).send('The organization with the given ID was not found.');

    res.send(organization);
};


const getCurrentOrganization = async (req, res) => {
    
    const organization = await Organization.findById(req.body._id);
    if (!organization) return res.status(404).send('The organization with the given ID was not found.');
    res.send(organization);
};


exports.createOrganization = createOrganization;
exports.getAllOrganizations = getAllOrganizations;
exports.updateOrganization = updateOrganization;
exports.deleteCurrentOrganization = deleteCurrentOrganization;
exports.getCurrentOrganization = getCurrentOrganization;

exports.validateOrganization = validateOrganization;