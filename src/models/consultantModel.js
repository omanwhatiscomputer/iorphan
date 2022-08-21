const { Schema } = require('mongoose');
const { User, validateUser } = require('./userModel');

const options = { discriminatorKey: 'kind'};
const Consultant = User.discriminator('Consultant', 
                    new Schema({ organization: {type: Schema.Types.ObjectId, required: false, ref: 'Organization'},
                                    isAssigned: {type:Boolean, default: false},
                                    proceedings: [{type: Schema.Types.ObjectId, ref: 'Proceeding'}]}, options));




exports.Consultant = Consultant; 
