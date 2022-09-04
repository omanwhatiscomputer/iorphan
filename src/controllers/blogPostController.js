const { User } = require('../models/userModel');
const {ImagesFile} = require('../models/imagesFileModel');
const mongoose = require('mongoose');
const { BlogPost } = require('../models/blogPostModel');
const _ = require('lodash');
const Joi = require("joi");

function validateBlogPost(blogPost){
    const schema = {
        author: Joi.string(),
        title: Joi.string().required().label("Title"),
        subHeading: Joi.string().required().label("Sub-heading"),
        body: Joi.string().required().label("body").max(5000),
        photo: Joi.string()
    };
    return Joi.object(schema).validate(blogPost);
}

const createBlogPost = async (req, res) => {
    const { error } = validateBlogPost(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    if(req.body.photo && req.body.author){
        req.body.author = mongoose.Types.ObjectId(req.body.author);
        req.body.photo = mongoose.Types.ObjectId(req.body.photo);
    }

    const properties = ["author", "title", "subHeading", "body", "photo"];

    
    const blogPost = new BlogPost(_.pick(req.body, properties));
    await blogPost.save();
    

    res.status(200).send(blogPost);
};


const getAllBlogPosts = async (req, res) => {
    const blogPosts = await BlogPost.find().populate("author").populate("photo");
    res.send(blogPosts);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const updateBlogPost = async (req, res) => {
    const properties = ["title", "subHeading", "body",];
    
    let blogPost = await BlogPost.findByIdAndUpdate(req.body._id, _.pick(req.body, properties));
    if (!blogPost) return res.status(404).send('BlogPost with the given ID was not found.');

    res.send(blogPost);
};


/**
 * @note  append the user '_id' attribute with the form data JSON
 * @param {*} req 
 * @param {*} res 
 * @returns operation status
 */
const deleteCurrentBlogPost = async (req, res) => {
    const blogPost = await BlogPost.findByIdAndRemove(req.body._id);

    if (!blogPost) return res.status(404).send('The blogPost with the given ID was not found.');

    res.send(blogPost);
};


const getCurrentBlogPost = async (req, res) => {
    const blogPost = await BlogPost.findById(req.body._id);
    if (!blogPost) return res.status(404).send('The blogPost with the given ID was not found.');
    res.send(blogPost);
};


exports.createBlogPost = createBlogPost;
exports.getAllBlogPosts = getAllBlogPosts;
exports.updateBlogPost = updateBlogPost;
exports.deleteCurrentBlogPost = deleteCurrentBlogPost;
exports.getCurrentBlogPost = getCurrentBlogPost;

exports.validateBlogPost = validateBlogPost;