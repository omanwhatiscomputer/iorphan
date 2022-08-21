const { User } = require('../models/userModel');
const { Orphan } = require('../models/orphanModel');
const _ = require('lodash');
const Joi = require('joi');


function validateOrphan(orphan){
    const schema = {
      orphanId: Joi.string().required().label("Orphan ID"),
      name: Joi.object().keys({
        firstName: Joi.string().required().max(100).label("First name"),
        nickname: Joi.string().required().max(100).label("Nickname"),
        lastName: Joi.string().required().max(100).label("Last name"),
      }),
      dateOfBirth: Joi.date().required().label("Date of Birth"),
      nationality: Joi.string().required().label("Nationality"),
      sex: Joi.string().required().label("Sex"),
      skinColor: Joi.string().required().label("Skin color"),
      religion: Joi.string().required().label("Religion"),
      disabilities: Joi.array().required().label("Disabilities"),
    };
    return Joi.object(schema).validate(orphan);
  }

const createOrphan = async (req, res) => {
    const { error } = validateOrphan(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    let orphan = await User.findOne({orphanId: req.body.orphanId});
    if(orphan) return res.status(400).send('The given ID has already been registered.');

    const properties = ["orphanId", "name", "dateOfBirth", "nationality",
                    "sex", "skinColor","religion", "disabilities", "biologicalParents"];
    
    orphan = new Orphan(_.pick(req.body, properties));
    await orphan.save();

    res.status(200).send("Success");
};


const getAllOrphans = async (req, res) => {
    const orphans = await Orphan.find();
    res.send(orphans);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateOrphan = async (req, res) => {
    const properties = ["name", "dateOfBirth", "nationality",
                    "sex", "skinColor","religion", "disabilities", "biologicalParents"];

    let orphan = await Orphan.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!orphan) return res.status(404).send('Orphan with the given ID was not found.');

    res.send(orphan);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentOrphan = async (req, res) => {
    const orphan = await Orphan.findByIdAndRemove(req.body._id);

    if (!orphan) return res.status(404).send('The orphan with the given ID was not found.');

    res.send(orphan);
};


const getCurrentOrphan = async (req, res) => {
    const orphan = await Orphan.findById(req.body._id);
    if (!orphan) return res.status(404).send('The orphan with the given ID was not found.');
    res.send(orphan);
};


exports.createOrphan = createOrphan;
exports.getAllOrphans = getAllOrphans;
exports.updateOrphan = updateOrphan;
exports.deleteCurrentOrphan = deleteCurrentOrphan;
exports.getCurrentOrphan = getCurrentOrphan;

exports.validateOrphan = validateOrphan;