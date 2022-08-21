const express = require('express');
const { createConsultant, updateConsultant, deleteCurrentConsultant, getAllConsultants, getCurrentConsultant } = require('./../controllers/consultantController');

const router = express.Router();

router.post('/createConsultant', createConsultant);
router.get('/', getAllConsultants);
router.put('/updateConsultant', updateConsultant);
router.delete('/deleteCurrentConsultant', deleteCurrentConsultant);
router.get('/me', getCurrentConsultant);

module.exports = router;