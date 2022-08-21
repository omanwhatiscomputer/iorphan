const express = require('express');
const {
    createDonation, 
    updateDonation, 
    deleteCurrentDonation, 
    getAllDonations, 
    getCurrentDonation,
    createAdoption, 
    updateAdoption, 
    deleteCurrentAdoption, 
    getAllAdoptions, 
    getCurrentAdoption,
    createVolunteer, 
    updateVolunteer, 
    deleteCurrentVolunteer, 
    getAllVolunteers, 
    getCurrentVolunteer,
} = require('./../controllers/transactionController');

const router = express.Router();






// Donation
router.post('/donation/', createDonation);
router.get('/donation/', getCurrentDonation);
router.put('/donation/', updateDonation);
router.delete('/donation/', deleteCurrentDonation);
router.get('/donation/all', getAllDonations);

// Adoption
router.post('/adoption/', createAdoption);
router.get('/adoption/', getCurrentAdoption);
router.put('/adoption/', updateAdoption);
router.delete('/adoption/', deleteCurrentAdoption);
router.get('/adoption/all', getAllAdoptions);

// Volunteer
router.post('/volunteer/', createVolunteer);
router.get('/volunteer/', getCurrentVolunteer);
router.put('/volunteer/', updateVolunteer);
router.delete('/volunteer/', deleteCurrentVolunteer);
router.get('/volunteer/all', getAllVolunteers);

module.exports = router;