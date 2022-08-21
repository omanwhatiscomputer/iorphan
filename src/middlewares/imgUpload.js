const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const uuid = require('uuid').v4;
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');


const storage = GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        const filename = path.parse(file.originalname).name + 
        uuid() + 
        path.extname(file.originalname);


        const id = mongoose.Types.ObjectId(crypto.randomBytes(12).toString('hex'));

        const fileInfo = {
            id: id,
            filename: filename,
            bucketName: 'images'
        };

        req.fileInfo = fileInfo; /// added
        return fileInfo;
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === 'image'){
        cb(null, true);
    }else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

const limits = { fileSize: 5 * 1024 * 1024, files: 1 }; //5 MB

const imgUpload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = imgUpload;