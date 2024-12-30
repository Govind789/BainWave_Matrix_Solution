const express = require('express');
const multer = require('multer');
const storage = require('../multerConfig');
const { createBlog, addComment, deleteComment, getBlogs, deleteBlogs } = require('../controllers/blogController');
const upload = multer({ storage });

const blogRouter = express.Router();

blogRouter.route('/blogs')
    .get(getBlogs);

blogRouter.route('/blogs/:blogId')
    .delete(deleteBlogs);

blogRouter.route('/create')
    .post(upload.single("image"),createBlog);

blogRouter.route('/blog/:blogId/comment')
    .post(addComment);

blogRouter.route('/blog/:blogId/comment/:commentId')
    .delete(deleteComment);

module.exports = blogRouter;
