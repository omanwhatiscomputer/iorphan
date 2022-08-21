const { AccountType } = require("./../models/accountTypeModel");
const _ = require('lodash')

const createAccountType = async (req, res) => {
    let accountType = new AccountType(_.pick(req.body, ["name",]));
    await accountType.save();
    res.status(200).send(accountType);
};
// getAllAccountType, getAccountType
const getOneAccountTypeByName = async (req, res) => {
    const accountType = await AccountType.find( _.pick(req.body, ["name",]));
    res.send(accountType);
};

const getAllAccountType = async (req, res) => {
    const accountType = await AccountType.find();
    res.send(accountType);
};

const deleteOneAccountTypeByName = async (req, res) => {
    const accountType = await AccountType.findOneAndDelete(_.pick(req.body, ["name",]));
    if(!accountType) return res.status(404).send("Account type of the given name was not found!");
    res.send(accountType);
};

exports.createAccountType = createAccountType;
exports.getOneAccountTypeByName = getOneAccountTypeByName;
exports.getAllAccountType = getAllAccountType;
exports.deleteOneAccountTypeByName = deleteOneAccountTypeByName;