const { Schema } =require('mongoose');
const { User } =require('./userModel');
const { orphanSchema } = require('./orphanModel');
const { proceedingSchema } = require('./proceedingModel');

const options = { discriminatorKey: 'kind'};
const Client = User.discriminator('Client', 
                    new Schema({ 
                        eligibility: {type: Boolean, required: true, default: false},
                        transactions: [{type: Schema.Types.ObjectId, ref: "Transaction"}], 
                        clientId: {type: Number, required: true}, 
                        creditCardNumber: {type: String, required: false}, 
                        isVolunteer: {type: Boolean, required: true, default: false},
                        hasVolunteered: {type: Boolean, required: true, default: false}, 
                        volunteeringAt: {type: Schema.Types.ObjectId, ref: "VolunteeringEvent"}, 
                        totalDonated: {type: Number, required: true, default: 0}, 
                        blacklisted: {type: Boolean, required: true, default: false}, 
                        hasAdoptedBefore: {type: Boolean, required: true, default: false},
                        pastOrphans: [{type: Schema.Types.ObjectId, ref: "Orphan"}],
                        inProcessOfAdoption: {type: Boolean, required: true, default: false},
                        currentProceedings: {type: Schema.Types.ObjectId, ref: "Proceeding"},}, options));




exports.Client = Client; 
