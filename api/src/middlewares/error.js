const { createError } = require("../utils/createError");

exports.error = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    res.status(status).send({
        success: true,
        message
    })
}

exports.genError = (req, res, next) => {
    return next(createError());
}