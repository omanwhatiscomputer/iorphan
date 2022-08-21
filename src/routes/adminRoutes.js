const express = require('express');
const { createAdmin, updateAdmin, deleteCurrentAdmin, getAllAdmins, getCurrentAdmin } = require('./../controllers/adminController');
const authorization = require('./../middlewares/authorization');
const router = express.Router();

router.post('/createAdmin', createAdmin);
router.get('/', getAllAdmins);
router.put('/updateAdmin', updateAdmin);
router.delete('/deleteCurrentAdmin', deleteCurrentAdmin);
router.get('/me', authorization, getCurrentAdmin);

module.exports = router;