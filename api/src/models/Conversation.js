const {model, Schema} = require('mongoose');

const conversationSchema = new Schema({
    members: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }]
},{timestamps: true});

module.exports = model('Conversation', conversationSchema);