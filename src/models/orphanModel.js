const { model, Schema }=require('mongoose');


const orphanSchema = new Schema({
    organization: {type: Schema.Types.ObjectId, required: true, ref:"Organization"},
    orphanId: {type: String, required: true, unique: true},
    name: {
      firstName: {type: String, required: true, maxlength: 100,},
      nickname: {type: String, required: true, maxlength: 100,},
      lastName: {type: String, required: true, maxlength: 100,}
    },
    biologicalParents: {father: {type:String, default: "Unknown"}, 
                        mother: {type:String, default: "Unknown"}},
    dateOfBirth: {type: Date, required: true,},
    nationality: {type: String, required: true,},
    history: {type: String, required: true, default:""},
    sex: {type: String, required: true,},
    adopted: {type: Boolean, required: true, default: false},
    adopteeId: {type: Schema.Types.ObjectId, ref: 'User'},
    skinColor: {type: String},
    religion: {type: String, required: false,},
    disabilities: [String],
    photo: {type: String, default: ""},
});
const Orphan = model("Orphan", orphanSchema);




exports.Orphan = Orphan; 
exports.orphanSchema = orphanSchema;
