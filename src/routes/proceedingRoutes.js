const express = require('express');
const { createProceeding, updateProceeding, deleteCurrentProceeding, getAllProceedings, getCurrentProceeding } = require('./../controllers/proceedingController');

const router = express.Router();

router.post('/', createProceeding);
router.get('/', getCurrentProceeding);
router.put('/:id', updateProceeding);
router.delete('/', deleteCurrentProceeding);
router.get('/all', getAllProceedings);

module.exports = router;