const mongoose = require('mongoose');

const fs = require('fs');



const getImg = async (req, res) => {
    const id = req.params.id;
    const filename = req.params.filename;

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'images'
    });

    gridfsbucket.openDownloadStream(mongoose.Types.ObjectId(id)).
    pipe(fs.createWriteStream('./cache/'+filename)).
        on('error', function (error) {
            console.log("error" + error);
            res.status(404).json({
                msg: error.message
            });
        }).
        on('finish', function () {
            console.log('done!');
            res.send('Downloaded successfully!')
        });
};


const deleteImg = async (req, res) => {
    const id = req.params.id;
    const filename = req.params.filename;

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'images'
    });

    await gridfsbucket.delete(mongoose.Types.ObjectId(id)).
        then( () => {
            console.log('done!');
            res.send('Deletion Successful!')
        }).
        catch( error => {
            console.log("error: " + error);
            res.status(404).json({
                msg: error.message
            });
        });
};


// routes
const uploadImg = (req, res) =>{
    res.status(200).send({fileInfo: req.fileInfo});
};



exports.deleteImg = deleteImg;
exports.getImg = getImg;
exports.uploadImg = uploadImg;