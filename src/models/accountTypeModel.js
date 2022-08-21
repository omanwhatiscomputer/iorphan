const { connect, model, Schema } = require('mongoose');

const accountTypeSchema = new Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50, unique: true},
});
const AccountType = model("AccountType", accountTypeSchema);



exports.accountTypeSchema = accountTypeSchema;
exports.AccountType = AccountType; 
