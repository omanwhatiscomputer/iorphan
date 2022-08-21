const express = require('express');
const { createAccountType, getAllAccountType, getOneAccountTypeByName, deleteOneAccountTypeByName } = require('./../controllers/accountTypeController');

const router = express.Router();

router.post('/createAccountType', createAccountType);
router.get('/', getAllAccountType);
router.get('/getOneAccountTypeByName', getOneAccountTypeByName); //By Name
router.delete('/deleteOneAccountTypeByName', deleteOneAccountTypeByName); //By Name

module.exports = router;
