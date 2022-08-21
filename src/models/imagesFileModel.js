const { connect, model, Schema } = require("mongoose");

const imagesFileSchema = Schema({
    length: Schema.Types.Number,
    chunkSize: Schema.Types.Number,
    uploadDate: Schema.Types.Date,
    filename: String,
    contentType: String,
});
const ImagesFile = model("Images.file", imagesFileSchema);



exports.ImagesFile = ImagesFile;
