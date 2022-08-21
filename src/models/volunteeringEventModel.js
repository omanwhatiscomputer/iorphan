const { model, Schema }=require('mongoose');

const volunteeringEventSchema = Schema({
    eventName: {type: String},
    organization: {type: Schema.Types.ObjectId, ref: 'Organization'},
    eventSubHeading: {type: String},
    eventDescription: {type: String},
    venue: {type: String},
    role: {type: String},
    startDate: {type: Date},
    endDate: {type: Date}, 
    volunteeringEventId: {type: String, unique: true, required: true},
    volunteers: [{type: Schema.Types.ObjectId, ref: 'User'}],
});
const VolunteeringEvent = model("VolunteeringEvent", volunteeringEventSchema);




exports.VolunteeringEvent = VolunteeringEvent;
