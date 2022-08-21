const { User } = require('../models/userModel');
const { Proceeding } = require('../models/proceedingModel');
const _ = require('lodash');



const createProceeding = async (req, res) => {
    
    let proceeding = await User.findOne({proceedingId: req.body.proceedingId});
    if(proceeding) return res.status(400).send('The given ID has already been registered.');

    const properties = ["proceedingId", "preferredAge", "preferredGender", "preferredReligion",];
    
    proceeding = new Proceeding(_.pick(req.body, properties));
    await proceeding.save();

    res.status(200).send("Success");
};


const getAllProceedings = async (req, res) => {
    const proceedings = await Proceeding.find();
    res.send(proceedings);
};


/**
 * @note  pass id param by URL
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateProceeding = async (req, res) => {

    let proceeding = await Proceeding.findByIdAndUpdate(req.params.id, req.body);
    if (!proceeding) return res.status(404).send('Proceeding with the given ID was not found.');

    res.send(proceeding);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentProceeding = async (req, res) => {
    const proceeding = await Proceeding.findByIdAndRemove(req.body._id);

    if (!proceeding) return res.status(404).send('The proceeding with the given ID was not found.');

    res.send(proceeding);
};


const getCurrentProceeding = async (req, res) => {
    const proceeding = await Proceeding.findById(req.body._id);
    if (!proceeding) return res.status(404).send('The proceeding with the given ID was not found.');
    res.send(proceeding);
};


exports.createProceeding = createProceeding;
exports.getAllProceedings = getAllProceedings;
exports.updateProceeding = updateProceeding;
exports.deleteCurrentProceeding = deleteCurrentProceeding;
exports.getCurrentProceeding = getCurrentProceeding;