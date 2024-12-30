const blogModel = require("../models/blogModel");
const userModel = require('../models/userModel');
// const imageModel = require('../models/imageModel');
const mongoose = require('mongoose');


const getBlogs = async (req, res) => {
    try {
        const data = await blogModel.find()
            .populate('user', 'username')  
            .populate('comments.user', 'username');  
        

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', msg: 'Server error' });
    }
};


const deleteBlogs = async(req,res)=>{

    const {blogId}= req.params;

    try {
        const blog = await blogModel.findByIdAndDelete(blogId);

        if (!blog) {
            return res.status(404).json({ status: 'failed', msg: 'Blog not found' });

        }

        res.status(200).json({ status: 'success', msg: 'blog deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', msg: 'Server error' });
    }
}



const createBlog = async (req, res) => {

    const { title, story, user} = req.body;

    const {path , filename} = req.file;


    try {
        if (!title || !story) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Title and story cannot be empty'
            });
        }

        if (!path || !filename){
            return res.status(400).json({
                status: 'failed',
                msg : 'please provide one image'
            })
        }

        if (!user || !mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Invalid or missing user field'
            });
        }
        
        const currUser = await userModel.findById(user);
        if (!currUser) {
            return res.status(404).json({ status: 'failed', msg: 'User not found' });
        }

        const blog = await blogModel.create({ title, story, user: user.toString(), image : {path ,filename} });

        currUser.blogs.push(blog._id);

        await currUser.save();

        return res.status(201).json({
            status: 'success',
            msg: 'Blog posted successfully',
            data: blog,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'failed', msg: 'Server error' });
    }
};


const addComment = async (req, res) => {
    const { blogId } = req.params;
    const { user, content } = req.body;

    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({
            status: 'failed',
            msg: 'Invalid or missing user field'
        });
    }

    if (!content || content.trim() === '') {
        return res.status(400).json({
            status: 'failed',
            msg: 'Comment content cannot be empty'
        });
    }

    try {
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ status: 'failed', msg: 'Blog not found' });
        }

        // console.log(blog);
        const comment = {
            user,
            content
        };

        blog.comments.push(comment);
        const data = await blog.save();

        return res.status(201).json({ status: 'success', msg: 'Comment added successfully', data: data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'failed', msg: 'Server error' });
    }
};


const deleteComment = async (req, res) => {

    const { blogId, commentId } = req.params;

    try {
        const blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).json({ status: 'failed', msg: 'Blog not found' });
        }

        const allComments = blog.comments;

        const commentIndex = allComments.findIndex(c => c._id.toString() === commentId);
        
        if (commentIndex === -1) {
            return res.status(404).json({ status: 'failed', msg: 'Comment not found' });
        }

        blog.comments.splice(commentIndex, 1);
        await blog.save();

        res.status(200).json({ status: 'success', msg: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', msg: 'Server error' });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    deleteBlogs,
    addComment,
    deleteComment
};
