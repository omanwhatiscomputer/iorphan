const { deleteImg, getImg, uploadImg } = require('./../controllers/imgUploadController');
const express = require('express');
const router = express.Router();
const imgUpload = require('./../middlewares/imgUpload').single('file');

// routes
router.get('/:id/:filename', getImg);
router.delete('/:id/:filename', deleteImg);
router.post('/', imgUpload, uploadImg);


module.exports = router;