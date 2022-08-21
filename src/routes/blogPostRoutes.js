const express = require('express');
const { createBlogPost, updateBlogPost, deleteCurrentBlogPost, getAllBlogPosts, getCurrentBlogPost } = require('./../controllers/blogPostController');

const router = express.Router();

router.post('/', createBlogPost);
router.get('/', getCurrentBlogPost);
router.put('/', updateBlogPost);
router.delete('/', deleteCurrentBlogPost);
router.get('/all', getAllBlogPosts);

module.exports = router;