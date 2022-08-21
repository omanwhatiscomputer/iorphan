const express = require('express');
const { deleteDoc, uploadDoc, getDoc } = require('./../controllers/docUploadController');
const router = express.Router();
const docUpload = require('./../middlewares/docUpload').single('file');

// routes

router.get('/:id/:filename', getDoc);
router.delete('/:id/:filename', deleteDoc);
router.post('/', docUpload, uploadDoc);

module.exports = router;
