const express = require('express');
const { createOrphan, updateOrphan, deleteCurrentOrphan, getAllOrphans, getCurrentOrphan } = require('./../controllers/orphanController');

const router = express.Router();

router.post('/', createOrphan);
router.get('/', getCurrentOrphan);
router.put('/', updateOrphan);
router.delete('/', deleteCurrentOrphan);
router.get('/all', getAllOrphans);

module.exports = router;