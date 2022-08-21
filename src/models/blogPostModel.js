const { connect, model, Schema } = require("mongoose");

const blogPostSchema = Schema({
    author: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    title: String,
    subHeading: String,
    body: String,
    postStatus: {type: String, enum: ["pending", "approved"], default: "pending"},
    dateCreated: {type: Date, default: new Date(Date.now()).toISOString()},
    photo: {type: Schema.Types.ObjectId, ref: "Images.file"},
});
const BlogPost = model("BlogPost", blogPostSchema);



exports.BlogPost = BlogPost;
