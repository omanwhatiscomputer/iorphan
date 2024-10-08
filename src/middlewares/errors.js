const multer = require('multer');


const errors = ((error, req, res, next) => {
    if (error instanceof multer.MulterError){
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              message: "file is too large",
            });
          }
      
          if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
              message: "File limit reached",
            });
          }
      
          if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
              message: "File must be of appropriate type",
            });
          }
    }else{
      return res.status(400).send("Bad Request");
    }
})

module.exports = errors;