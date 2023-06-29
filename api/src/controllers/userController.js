const { auth } = require("../middlewares/auth");
const { catchAsync } = require("../middlewares/catchAsync");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { createError } = require("../utils/createError");
const { sendToken } = require("../utils/sendToken");
const cloudinary = require("cloudinary").v2;

exports.signup = catchAsync(async (req, res, next) => {
  const { email, handle, avatar } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(createError(400, "User already exist"));
  }

  user = await User.findOne({ handle });
  if (user) {
    return next(createError(400, "Handle is not available"));
  }

  if (avatar) {
    const img = await cloudinary.uploader.upload(avatar);
    req.body.avatar = {
      id: img.public_id,
      url: img.secure_url,
    };
  }

  const newUser = await User.create({ ...req.body });

  sendToken(res, 201, "Signup successfully", newUser);
});

exports.login = catchAsync(async (req, res, next) => {
  const { userId, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: userId }, { handle: userId }],
  }).select("+password");
  if (!user) {
    return next(createError(404, "User not found"));
  }

  if (!user.comparePassword(password)) {
    return next(createError(403, "Password is incorrect"));
  }

  sendToken(res, 200, "Login successfully", user);
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = { maxAge: 0, secure: true,
            sameSite: 'none' 
                        };

  res.cookie("auth_token", null, cookieOptions).send({
    success: true,
    message: "Logout successfully",
  });
});

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId).populate("posts");
  if (!user) {
    return next(createError(404, "User not found"));
  }

  res.send({
    success: true,
    user,
  });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.userId);
  if (!user) {
    return next(createError(404, "User not found"));
  }

  const { email, handle, avatar } = req.body;

  if (email) {
    if (email !== user.email) {
      let user1 = await User.findOne({ email });
      if (user1) {
        return next(createError(400, "Email already exist"));
      }
    }
  }

  if (handle) {
    if (handle !== user.handle) {
      let user1 = await User.findOne({ handle });
      if (user1) {
        return next(createError(400, "Handle is not available"));
      }
    }
  }

  if (avatar) {
    if (avatar !== user.avatar.url) {
      if(user.avatar.url){
        await cloudinary.uploader.destroy(user.avatar.id);
      }
      const img = await cloudinary.uploader.upload(avatar);

      req.body.avatar = {
        id: img.public_id,
        url: img.secure_url,
      };
    } else {
      req.body.avatar = user.avatar;
    }
  }

  user = await User.findByIdAndUpdate(
    req.userId,
    { $set: { ...req.body } },
    { new: true }
  );

  res.send({
    success: true,
    message: "Profile updated successfully",
    user
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.userId).select("+password");
  if (!user) {
    return next(createError(404, "User not found"));
  }

  const { newPassword, oldPassword } = req.body;

  if (!user.comparePassword(oldPassword)) {
    return next(createError(403, "Old Password is incorrect"));
  }

  user.password = newPassword;
  await user.save();

  res.send({
    success: true,
    message: "Password updated successfully",
  });
});

exports.followUser = catchAsync(async (req, res, next) => {
  let user1 = await User.findById(req.userId);
  let user2 = await User.findOne({ handle: req.params.handle });

  if (!user1) {
    return next(createError(404, "User not found"));
  }

  if (!user2) {
    return next(createError(404, "Follow user not found"));
  }

  const userId1 = user1._id;
  const userId2 = user2._id;

  if (String(userId1) === String(userId2)) {
    return next(createError(403, "User cannot follow self"));
  }

  const isFollowed = user2.followers.includes(userId1);

  if (isFollowed) {
    await User.findByIdAndUpdate(userId1, { $pull: { followings: userId2 } });
    await User.findByIdAndUpdate(userId2, { $pull: { followers: userId1 } });

    res.send({
      success: true,
      message: user2.name + " unfollowed",
    });
  } else {
    await User.findByIdAndUpdate(userId1, { $push: { followings: userId2 } });
    await User.findByIdAndUpdate(userId2, { $push: { followers: userId1 } });

    res.send({
      success: true,
      message: user2.name + " followed",
    });
  }
});

exports.deleteMyProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId)
    .select("+password")
    .populate("posts");
  if (!user) {
    return next(createError(404, "User not found"));
  }

  if (!user.comparePassword(req.body.password)) {
    return next(createError(403, "Password is incorrect"));
  }

  // delete user profile photo
  if (user.avatar.url) {
    await cloudinary.uploader.destroy(user.avatar.id);
  }

  // return res.send(user);

  // delete user posts
  for (let i = 0; i < user.posts.length; i++) {
    const post = user.posts[i];

    await Post.findByIdAndDelete(post._id);

    // delete post image
    if (post.image.url) {
      await cloudinary.uploader.destroy(post.image.id);
    }
  }

  // delete all posts likes
  const posts = await Post.find();
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    await Post.findByIdAndUpdate(post._id, { $pull: { likes: req.userId } });
  }

  // delete user comments
  const userComments = await Comment.find({ user: req.userId });
  for (let i = 0; i < userComments.length; i++) {
    const comment = userComments[i];
    await Comment.findByIdAndDelete(comment._id);
  }

  // delete comments that user likes
  const comments = await Comment.find();
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    await Comment.findByIdAndUpdate(comment._id, {
      $pull: { likes: req.userId },
    });
  }

  // delete user for other user followers and followings
  const users = await User.find();
  for (let i = 0; i < users.length; i++) {
    await User.findByIdAndUpdate(users[i]._id, {
      $pull: { followings: req.userId },
    });
    await User.findByIdAndUpdate(users[i]._id, {
      $pull: { followers: req.userId },
    });
  }

  // delete user
  await User.findByIdAndDelete(req.userId);

  // logout user
  const cookieOptions = { maxAge: 0, httpOnly: true };

  res.cookie("auth_token", null, cookieOptions).send({
    success: true,
    message: "Profile deleted successfully",
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ handle: req.params.handle }).populate("posts followers followings");
  if (!user) {
    return next(createError(404, "User not found"));
  }

  res.send({
    success: true,
    user,
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const query = {
    $regex: req.query.q || "",
    $options: "i",
  };

  let users = await User.find({ $or: [{ name: query }, { handle: query }] });

  res.send({
    success: true,
    users: users,
  });
});

exports.getSuggestedUsers = catchAsync(async (req, res, next) => {
  let users = await User.find().sort({createdAt: -1});
  let suggested = [];

  users.forEach(user => {
    if(!user.followers.includes(req.userId)){
        if(String(user._id) !== String(req.userId)){
            suggested.push(user);
        }
    }
  })

  res.send({
    success: true,
    users: suggested.splice(0,3)
  })
});
