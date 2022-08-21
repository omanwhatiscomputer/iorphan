const express = require('express');
const { createOrganization, updateOrganization, deleteCurrentOrganization, getAllOrganizations, getCurrentOrganization } = require('./../controllers/organizationController');

const router = express.Router();

router.post('/', createOrganization);
router.get('/', getCurrentOrganization);
router.put('/', updateOrganization);
router.delete('/', deleteCurrentOrganization);
router.get('/all', getAllOrganizations);

module.exports = router;