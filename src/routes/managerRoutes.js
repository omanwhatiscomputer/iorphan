const express = require('express');
const { createManager, updateManager, deleteCurrentManager, getAllManagers, getCurrentManager } = require('./../controllers/managerController');

const router = express.Router();

router.post('/createManager', createManager);
router.get('/', getAllManagers);
router.put('/updateConsultant', updateManager);
router.delete('/deleteCurrentConsultant', deleteCurrentManager);
router.get('/me', getCurrentManager);


module.exports = router;