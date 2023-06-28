const { catchAsync } = require("../middlewares/catchAsync");
const { createError } = require("../utils/createError");
const jwt = require('jsonwebtoken');

exports.auth = catchAsync(async (req, res, next) => {
    const token = req.cookies.auth_token;

    if(!token){
        return next(createError(401, 'User not logged'));
    }

    const {id} = await jwt.decode(token, process.env.JWT_SECRET);
    if(!id){
        return next(createError(403, 'Auth token is not valid'));
    }

    req.userId = id;
    next();
})