const express = require('express');
const { createClient, updateClient, getCurrentClient, deleteCurrentClient, getAllClients } = require('./../controllers/clientController');
const authorization = require('./../middlewares/authorization');

const router = express.Router();

router.post('/createClient', createClient);
router.get('/', getAllClients);
router.put('/updateClient', updateClient);
router.delete('/deleteCurrentClient', deleteCurrentClient);
router.get('/me', authorization, getCurrentClient);

module.exports = router;