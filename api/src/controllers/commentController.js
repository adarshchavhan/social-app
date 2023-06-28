const { catchAsync } = require("../middlewares/catchAsync");
const { createError } = require("../utils/createError");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getPostComments = catchAsync(async (req, res, next) => {
    const postId = req.params.id;

    const comments = await Comment.find({postId}).populate("user").sort({createdAt: -1});
    
    res.send({
        success: true,
        comments
    })
});

exports.addComment = catchAsync(async (req, res, next) => {
    const {postId} = req.body;

    const post = await Post.findById(postId);
    if(!post){
        return next(createError(404, 'Post not found'));
    }

    const newComment = await Comment.create({
        ...req.body, user: req.userId
    })

    await Post.findByIdAndUpdate(postId, {$push: {comments: newComment._id}});

    res.send({
        success: true,
        message: 'New comment added',
        comment: newComment
    })
});

exports.updateComment = catchAsync(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id);
    if(!comment){
        return next(createError(404, 'Comment not found'));
    }

    if(String(comment.user) !== String(req.userId)){
        return next(createError(403, 'Action denied'));
    }

    comment.text = req.body.text;
    await comment.save();
    
    res.send({
        success: true,
        message: 'comment updated successfully',
        comment
    })
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id);
    if(!comment){
        return next(createError(404, 'Comment not found'));
    }

    if(String(comment.user) !== String(req.userId)){
        return next(createError(403, 'Action denied'));
    }

    await Comment.findByIdAndDelete(comment._id);

    await Post.findByIdAndUpdate(comment.postId, {$pull: {comments: comment._id}});

    res.send({
        success: true,
        message: 'comment deleted successfully',
    })
});

exports.likeComment = catchAsync(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id);
    if(!comment){
        return next(createError(404, 'Comment not found'));
    }

    const isLiked = comment.likes.includes(req.userId);
    if(isLiked){
        await Comment.findByIdAndUpdate(comment._id, {$pull: {likes: req.userId}});

        res.send({
            success: true,
            message: 'Comment unliked'
        })

    }else{

        await Comment.findByIdAndUpdate(comment._id, {$push: {likes: req.userId}});

        res.send({
            success: true,
            message: 'Comment liked'
        })
    }

});