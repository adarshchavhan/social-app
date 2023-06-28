const { catchAsync } = require("../middlewares/catchAsync");
const Message = require("../models/Message");

exports.addMessage = catchAsync(async (req, res, next) => {
    const message = await Message.create({
        ...req.body, sender: req.userId
    });

    res.status(201).send({
        success: true,
        message
    })
});

exports.getMessages =catchAsync(async (req, res, next) => {
    const messages = await Message.find({conversation: req.params.id}).populate('sender');

    res.send({
        success: true,
        messages
    })
});