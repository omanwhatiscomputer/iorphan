const { Schema } = require('mongoose');
const { User } = require('./userModel');

const options = { discriminatorKey: 'kind'};
const Manager = User.discriminator('Manager', 
                    new Schema({ organization: {type: Schema.Types.ObjectId, ref: 'Organization'},
                                    isAssigned: {type:Boolean, default: false} }, options));


exports.Manager = Manager; 