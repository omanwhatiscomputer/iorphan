const express = require('express');
const { createVolunteeringEvent, updateVolunteeringEvent, deleteCurrentVolunteeringEvent, getAllVolunteeringEvents, getCurrentVolunteeringEvent } = require('./../controllers/volunteeringEventController');

const router = express.Router();

router.post('/', createVolunteeringEvent);
router.get('/', getCurrentVolunteeringEvent);
router.put('/', updateVolunteeringEvent);
router.delete('/', deleteCurrentVolunteeringEvent);
router.get('/all', getAllVolunteeringEvents);

module.exports = router;