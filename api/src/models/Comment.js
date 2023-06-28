const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String, 
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = model('Comment', commentSchema);