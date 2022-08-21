const { model, Schema } = require('mongoose');
const Joi = require('joi');


const organizationSchema = Schema({
    name: {type: String, minlength: 2, maxlength: 32, unique: true},
    location: Schema({latitude: Number, longitude: Number}),
    manager: {type: Schema.Types.ObjectId, ref: 'User'},
    address: {
        addressLine1: {type: String, maxlength: 255, required: true},
        addressLine2: {type: String, maxlength: 255}, 
        city: {type: String, required: true, maxlength: 25,}, 
        state: {type: String, required: true, maxlength: 25,}, 
        zipCode: {type: String, required: true}, 
        country: {type: String, required: true, maxlength: 25,},
   },
    description: {type: String},
    logo: {type: String, default: ""},
    orphans: [{type: Schema.Types.ObjectId, ref: 'Orphan'}],
    contacts: {
        email: {type: String, required: true, maxlength: 100},
        phoneNumber_1: {type: String, required: true, maxlength: 15,},
        phoneNumber_2: {type: String, maxlength: 15,},
        website: {type: String, maxlength: 255,},
    },
    bankAccountNo: {type: String, required: true, maxlength: 13},
    hasManager: {type: Boolean, default: false},
});

const Organization = model("Organization", organizationSchema);



exports.organizationSchema = organizationSchema;
exports.Organization = Organization;
