const { model, Schema } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  prefix: {type: String, maxlength: 10},
  accountType: {type: Schema.Types.ObjectId, ref: "AccountType"},
  email: {type: String, required: true, maxlength: 100, unique: true},
  password: {type: String, required: true, minlength: 6, maxlength: 2048,},
  name: {firstName: {type: String, required: true, maxlength: 100,},
          nickname: {type: String, required: true, maxlength: 100,},
          lastName: {type: String, required: true, maxlength: 100,}
        },
  mobileNo: {type: String, required: true, maxlength: 15,},
  bankAccountNo: {type: String, required: true, maxlength: 13},
  address: {addressLine1: {type: String, maxlength: 255, required: true},
             addressLine2: {type: String, maxlength: 255}, 
             city: {type: String, required: true, maxlength: 25,}, 
             state: {type: String, required: true, maxlength: 25,}, 
             zipCode: {type: String, required: true}, 
             country: {type: String, required: true, maxlength: 25,},
            },
  dateOfBirth: {type: Date, required: true,},
  nationality: {type: String, required: true,},
  sex: {type: String, required: true,},
  currency: {type: String, required: true, default: "$"},
  profilePhoto: {type: String, default: ""},
  dateCreated: {type: Date, default: new Date(Date.now()).toISOString()},
  blogPosts: [{type: Schema.Types.ObjectId, ref: "BlogPost"}],
});

userSchema.methods.generateAuthToken = function(){
  
  const payload = {_id: this._id, __t: this.__t};
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = model('User', userSchema);




exports.User = User; 
