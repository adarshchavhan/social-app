const { catchAsync } = require("../middlewares/catchAsync");
const { createError } = require("../utils/createError");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const cloudinary = require('cloudinary').v2;

exports.createPost = catchAsync(async (req, res, next) => {
    const {image} = req.body;

    if(image){
        const img = await cloudinary.uploader.upload(image);
        req.body.image = {
            id: img.public_id,
            url: img.secure_url
        }
    }
    
    const newPost = await Post.create({
        ...req.body, user: req.userId
    });

    await User.findByIdAndUpdate(req.userId, {$push: {posts: newPost._id}});

    res.send({
        success: true,
        message: 'New post created successfully',
        post: newPost
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const {image} = req.body;

    let post = await Post.findById(req.params.id);
    if(!post){
        return next(createError(404, 'Post not found'));
    }

    if(String(post.user) !== String(req.userId)){
        return next(createError(403, 'Action denied'));
    }

    if(image){
        if(image !== post.image.url){
            await cloudinary.uploader.destroy(post.image.id);
            const img = await cloudinary.uploader.upload(image);

            req.body.image = {
                id: img.public_id,
                url: img.secure_url
            }

        }else{
            req.body.image = post.image;
        }
    }

    post = await Post.findByIdAndUpdate(post._id, {$set: {...req.body}}, {new: true});

    res.send({
        success: true,
        message: 'Post updated successfully',
        post
    });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    if(!post){
        return next(createError(404, 'Post not found'));
    }

    if(String(post.user) !== String(req.userId)){
        return next(createError(403, 'Action denied'));
    }

    if(post.image.url){
        await cloudinary.uploader.destroy(post.image.id);
    }
    const comments = post.comments;

    for(let i=0; i<=comments.length; i++){
        await Comment.findByIdAndDelete(comments[i])
    }


    await Post.findByIdAndDelete(post._id);

    await User.findByIdAndUpdate(req.userId, {$pull: {posts: post._id}});

    res.send({
        success: true,
        message: 'Post deleted successfully'
    });
});

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('user likes comments');
    if(!post){
        return next(createError(404, 'Post not found'));
    }

    res.send({
        success: false,
        post
    })
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    let user = req.query ? await User.findOne({handle:req.query.user}) : '';
    let saved = req.query.saved ? req.query.saved: false;

    const posts = await Post.find(user ? saved==='true' ? {saved:user._id} : {user: user._id} : {}).populate('user').sort({createdAt: -1});


    res.send({
        success: false,
        posts
    })
});

exports.getFollowingsPosts = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.userId);
    if(!user){
        return next(createError(404, 'User not found'))
    }

    const posts = await Post.find({$or: [
        {user},
        {user: {$in: user.followings}}
    ]}).populate('user').sort({createdAt: -1});

    res.send({
        success: false,
        posts
    })
});

exports.likePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(createError(404, 'Post not found'));
    }

    const isLiked = post.likes.includes(req.userId);

    if(isLiked){
        await Post.findByIdAndUpdate(post._id, {$pull: {likes: req.userId}});
        res.send({
            success: false,
            message: 'Post unliked'
        })

    }else{
        await Post.findByIdAndUpdate(post._id, {$push: {likes: req.userId}});
        res.send({
            success: false,
            message: 'Post liked'
        })
    }
});

exports.savePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(createError(404, 'Post not found'));
    }

    const isLiked = post.saved.includes(req.userId);

    if(isLiked){
        await Post.findByIdAndUpdate(post._id, {$pull: {saved: req.userId}});
        await User.findByIdAndUpdate(req.userId, {$pull: {saved: post._id}});
        res.send({
            success: false,
            message: 'Post unsaved'
        })

    }else{
        await Post.findByIdAndUpdate(post._id, {$push: {saved: req.userId}});
        await User.findByIdAndUpdate(req.userId, {$push: {saved: post._id}});
        res.send({
            success: false,
            message: 'Post Saved'
        })
    }
});