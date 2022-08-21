const mongoose = require('mongoose');

const fs = require('fs');



const getDoc = async (req, res) => {
    const id = req.params.id;
    const filename = req.params.filename;

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'documents'
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

const deleteDoc = async (req, res) => {
    const id = req.params.id;
    const filename = req.params.filename;

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'documents'
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



const uploadDoc = (req, res) => {
    res.status(200).send({fileInfo: req.fileInfo});
};

exports.deleteDoc = deleteDoc;
exports.uploadDoc = uploadDoc;
exports.getDoc = getDoc;