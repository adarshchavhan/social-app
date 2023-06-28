const { catchAsync } = require("../middlewares/catchAsync");
const Conversation = require("../models/Conversation");
const { createError } = require("../utils/createError");


exports.addConversation = catchAsync(async (req, res, next) => {

    if(String(req.body.reciverId)===String(req.userId)){
        return next(createError(403, 'Sender and reciver id must be diffrent.'))
    }

    const conversation = await Conversation.findOne({ 
        members: {
            $all: [req.body.reciverId, req.userId] 
        }
    }).populate('members');

    if(!conversation){
        const newConversation = await Conversation.create({ 
            members: [req.body.reciverId, req.userId]
        })

        return res.status(201).send({
            success: true,
            conversation: newConversation
        })
    }

    res.send({
        success: true,
        conversation
    })
});


exports.getConversations = catchAsync(async (req, res, next)=> {
    const conversations = await Conversation.find({members: {$in: [req.userId]}}).populate('members');

    res.send({
        success: true,
        conversations
    })
})