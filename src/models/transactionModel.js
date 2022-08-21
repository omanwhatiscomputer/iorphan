const { connect, model, Schema }=require('mongoose');
const {joi} = require('joi');

const transactionSchema = new Schema({
    amount: {type: Number}, 
    transactionId: {type: String, unique: true, required: true}, 
    user: { type: Schema.Types.ObjectId, required: true, ref:"User" }, 
    currency: {type: String}, 
    date: {type: Date, default: new Date(Date.now()).toISOString()},
});

const Transaction = model('Transaction', transactionSchema);

/** Child models: 
 * - volunteer registration
 * - donation
 * - adoption registration
*/

const options = { discriminatorKey: 'kind'};
const VoluteerTransaction = Transaction.discriminator('Volunteer', new Schema({transactionStatus: {type: String, default: "pending approval"}, 
    volunteeringEvent: {type: Schema.Types.ObjectId, ref: "VolunteeringEvent", required: true}}, options));

const DonationTransaction = Transaction.discriminator('Donation', new Schema({transactionStatus: {type: String, default: "pending approval"},
    organization: { type: Schema.Types.ObjectId, required: true, ref:"Organization" },}, options));

const AdoptionTransaction = Transaction.discriminator('Adoption', new Schema({transactionStatus: {type: String, default: "pending approval"}, 
    proceeding: { type: Schema.Types.ObjectId, required: true, ref:"Proceeding" }, }, options));


/** Joi validation schema 
  * TODO: function -> validateTransaction(params=> {Transaction: object}) :: returns error object.
*/

exports.Transaction = Transaction; 
exports.transactionSchema = transactionSchema;

exports.VoluteerTransaction = VoluteerTransaction;
exports.DonationTransaction = DonationTransaction;
exports.AdoptionTransaction = AdoptionTransaction;