const express = require('express');
const authorization = require('../middlewares/authorization');
const { getCurrentUser, updateCurrentUser } = require('./../controllers/userController');

const router = express.Router();

router.get('/me', authorization, getCurrentUser);
router.put('/', updateCurrentUser)

module.exports = router;