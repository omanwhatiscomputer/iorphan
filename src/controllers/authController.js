const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('./../models/userModel');

function validate(credentials){
    const schema = {
        email: Joi.string().min(5).max(255).required().email().label("Email"),
        password: Joi.string().min(5).max(255).required().label("Password"),
    };
    return Joi.object(schema).validate(credentials);
}

const authenticateUser = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).header('x-user-type', user.__t).send(token);
};


exports.authenticateUser = authenticateUser;
