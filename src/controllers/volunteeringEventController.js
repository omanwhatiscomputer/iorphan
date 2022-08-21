const { User } = require('../models/userModel');
const { VolunteeringEvent } = require('../models/volunteeringEventModel');
const _ = require('lodash');
const Joi = require('joi');

function validateVolunteeringEvent(volunteeringEvent){
    const schema = {
        eventName: Joi.string().label("Event Name").max(255).min(2).required(),
        eventSubHeading: Joi.string().label("Sub-heading").max(1024).min(16).required(),
        eventDescription: Joi.string().label("Description").max(2048).min(16).required(),
        venue: Joi.string().label("Venue").max(64).min(32).required(),
        role: Joi.string().label("Venue").max(32).min(2).required(),
        startDate: Joi.date().label('Start date').required(),
        endDate: Joi.date().label('End date').required(),
        volunteeringEventId: Joi.string().label("Event ID").required(),
    };
    return Joi.object(schema).validate(volunteeringEvent);
}

const createVolunteeringEvent = async (req, res) => {
    const { error } = validateVolunteeringEvent(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let volunteeringEvent = await User.findOne({volunteeringEventId: req.body.volunteeringEventId});
    if(volunteeringEvent) return res.status(400).send('The given ID has already been registered.');

    const properties = ["eventName", "eventSubHeading", "eventDescription", "venue",
                    "role", "startDate", "endDate", "volunteeringEventId"];
    
    volunteeringEvent = new VolunteeringEvent(_.pick(req.body, properties));
    await volunteeringEvent.save();

    res.status(200).send("Success");
};


const getAllVolunteeringEvents = async (req, res) => {
    const volunteeringEvents = await VolunteeringEvent.find();
    res.send(volunteeringEvents);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateVolunteeringEvent = async (req, res) => {
    const properties = ["eventName", "eventSubHeading", "eventDescription", "venue",
                    "role", "startDate", "endDate"];

    let volunteeringEvent = await VolunteeringEvent.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!volunteeringEvent) return res.status(404).send('VolunteeringEvent with the given ID was not found.');

    res.send(volunteeringEvent);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentVolunteeringEvent = async (req, res) => {
    const volunteeringEvent = await VolunteeringEvent.findByIdAndRemove(req.body._id);

    if (!volunteeringEvent) return res.status(404).send('The volunteeringEvent with the given ID was not found.');

    res.send(volunteeringEvent);
};


const getCurrentVolunteeringEvent = async (req, res) => {
    const volunteeringEvent = await VolunteeringEvent.findById(req.body._id);
    if (!volunteeringEvent) return res.status(404).send('The volunteeringEvent with the given ID was not found.');
    res.send(volunteeringEvent);
};


exports.createVolunteeringEvent = createVolunteeringEvent;
exports.getAllVolunteeringEvents = getAllVolunteeringEvents;
exports.updateVolunteeringEvent = updateVolunteeringEvent;
exports.deleteCurrentVolunteeringEvent = deleteCurrentVolunteeringEvent;
exports.getCurrentVolunteeringEvent = getCurrentVolunteeringEvent;

exports.validateVolunteeringEvent = validateVolunteeringEvent;