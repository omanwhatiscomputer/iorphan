const { connect, model, Schema } = require('mongoose');
const { User } = require('./userModel');



const options = { discriminatorKey: 'kind'};
const Admin = User.discriminator('Admin', 
                    new Schema({ adminId:{type: Number, required: true} }, options));





exports.Admin = Admin; 
