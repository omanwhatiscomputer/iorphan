const { User } = require('./../models/userModel');
const { VoluteerTransaction, DonationTransaction, AdoptionTransaction } = require('./../models/transactionModel');
const _ = require('lodash');

const createDonation = async (req, res) => {

    let donation = await User.findOne({transactionId: req.body.transactionId});
    if(donation) return res.status(400).send('The given ID has already been registered.');

    const properties = ["transactionId", "currency", "amount"];
    
    donation = new Donation(_.pick(req.body, properties));
    await donation.save();

    res.status(200).send("Success");
};


const getAllDonations = async (req, res) => {
    const donations = await Donation.find();
    res.send(donations);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateDonation = async (req, res) => {

    let donation = await Donation.findByIdAndUpdate(req.body._id, req.body);
    if (!donation) return res.status(404).send('Donation with the given ID was not found.');

    res.send(donation);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentDonation = async (req, res) => {
    const donation = await Donation.findByIdAndRemove(req.body._id);

    if (!donation) return res.status(404).send('The donation with the given ID was not found.');

    res.send(donation);
};


const getCurrentDonation = async (req, res) => {
    const donation = await Donation.findById(req.body._id);
    if (!donation) return res.status(404).send('The donation with the given ID was not found.');
    res.send(donation);
};


exports.createDonation = createDonation;
exports.getAllDonations = getAllDonations;
exports.updateDonation = updateDonation;
exports.deleteCurrentDonation = deleteCurrentDonation;
exports.getCurrentDonation = getCurrentDonation;





const createAdoption = async (req, res) => {

    let adoption = await User.findOne({transactionId: req.body.transactionId});
    if(adoption) return res.status(400).send('The given ID has already been registered.');

    const properties = ["transactionId", "currency", "amount"];
    
    adoption = new Adoption(_.pick(req.body, properties));
    await adoption.save();

    res.status(200).send("Success");
};


const getAllAdoptions = async (req, res) => {
    const adoptions = await Adoption.find();
    res.send(adoptions);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateAdoption = async (req, res) => {

    let adoption = await Adoption.findByIdAndUpdate(req.body._id, req.body);
    if (!adoption) return res.status(404).send('Adoption with the given ID was not found.');

    res.send(adoption);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentAdoption = async (req, res) => {
    const adoption = await Adoption.findByIdAndRemove(req.body._id);

    if (!adoption) return res.status(404).send('The adoption with the given ID was not found.');

    res.send(adoption);
};


const getCurrentAdoption = async (req, res) => {
    const adoption = await Adoption.findById(req.body._id);
    if (!adoption) return res.status(404).send('The adoption with the given ID was not found.');
    res.send(adoption);
};


exports.createAdoption = createAdoption;
exports.getAllAdoptions = getAllAdoptions;
exports.updateAdoption = updateAdoption;
exports.deleteCurrentAdoption = deleteCurrentAdoption;
exports.getCurrentAdoption = getCurrentAdoption;

const createVolunteer = async (req, res) => {

    let volunteer = await User.findOne({transactionId: req.body.transactionId});
    if(volunteer) return res.status(400).send('The given ID has already been registered.');

    const properties = ["transactionId", "currency", "amount"];
    
    volunteer = new Volunteer(_.pick(req.body, properties));
    await volunteer.save();

    res.status(200).send("Success");
};


const getAllVolunteers = async (req, res) => {
    const volunteers = await Volunteer.find();
    res.send(volunteers);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateVolunteer = async (req, res) => {

    let volunteer = await Volunteer.findByIdAndUpdate(req.body._id, req.body);
    if (!volunteer) return res.status(404).send('Volunteer with the given ID was not found.');

    res.send(volunteer);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentVolunteer = async (req, res) => {
    const volunteer = await Volunteer.findByIdAndRemove(req.body._id);

    if (!volunteer) return res.status(404).send('The volunteer with the given ID was not found.');

    res.send(volunteer);
};


const getCurrentVolunteer = async (req, res) => {
    const volunteer = await Volunteer.findById(req.body._id);
    if (!volunteer) return res.status(404).send('The volunteer with the given ID was not found.');
    res.send(volunteer);
};


exports.createVolunteer = createVolunteer;
exports.getAllVolunteers = getAllVolunteers;
exports.updateVolunteer = updateVolunteer;
exports.deleteCurrentVolunteer = deleteCurrentVolunteer;
exports.getCurrentVolunteer = getCurrentVolunteer;