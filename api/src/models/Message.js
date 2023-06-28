const {model, Schema} = require('mongoose');

const messageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }    
},{timestamps: true});

module.exports = model('message', messageSchema);