const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const uuid = require('uuid').v4;
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');


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
            bucketName: 'documents'
        };

        req.fileInfo = fileInfo; /// added
        return fileInfo;
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === 'text' || file.mimetype.split("/")[0] === 'application'){
        cb(null, true);
    }else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};


const limits = { fileSize: 30 * 1024 * 1024, files: 1 }; //30 MB


const docUpload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = docUpload;
