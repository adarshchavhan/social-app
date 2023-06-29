exports.sendToken = async (res, status, message, user) => {
    const {password, ...resUser} = user._doc;
   
    const token = await user.genJWTToken();

    const cookieOptions = {
        maxAge: 7*24*60*60*1000,
        secure: true,
        sameSite: 'none'
    }

    res.status(status)
        .cookie('auth_token', token, cookieOptions)
        .send({
            success: false,
            message,
            user: resUser
        });
}
