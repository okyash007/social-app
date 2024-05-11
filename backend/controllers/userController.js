import User from "../modles/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createAcessToken } from "../utils/createAcessToken.js";
import { hashPassword, unhashPassword } from "../utils/hashunhashPassword.js";
import { removePassword } from "../utils/removePassword.js";

export const startUser = asyncHandler(async (req, res, next) => {
  const { avatar, fullname, password, username } = req.body;

  const existUser = await User.findOne({ username });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(253402300000000),
  };

  if (existUser) {
    const correctPassword = unhashPassword(password, existUser.password);

    if (!correctPassword) {
      return next(new apiError(400, "Credentials are not correct"));
    }

    const acessToken = createAcessToken(existUser._id);

    return res
      .status(200)
      .cookie("acess_token", acessToken, options)
      .json(new apiResponse(200, removePassword(existUser._doc)));
  } else if (!existUser) {
    const hashedPassword = hashPassword(password);

    const newUser = new User({
      avatar,
      fullname,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const acessToken = createAcessToken(newUser._id);

    return res
      .status(200)
      .cookie("acess_token", acessToken, options)
      .json(new apiResponse(200, removePassword(newUser._doc)));
  }

  // return next(new apiError(400, "something went wrong"))
  // return res.json(new apiResponse(200, req.body));
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  const user = await User.findOne({ username })
    .populate("posts")
    .select("-password");

  if (!user) {
    return next(new apiError(400, "No such user is there"));
  }

  return res.json(new apiResponse(200, user));
});

export const follow = asyncHandler(async (req, res, next) => {
  const { uid } = req.body;

  if (!uid) {
    return next(new apiError(400, "uid is missing"));
  }

  if (uid !== req.user.id) {
    return next(new apiError(400, "you are not authorized"));
  }

  const followedTo = await User.findOne({ username: req.params.username });
  const followedBy = await User.findById(uid);

  if (followedTo._id === uid) {
    return next(new apiError(400, "you can't follow yourself"));
  }

  const isFollow =
    followedBy.following.includes(followedTo._id) ||
    followedTo.followers.includes(followedBy._id);

  if (isFollow) {
    followedBy.following.pull(followedTo._id);
    followedTo.followers.pull(followedBy._id);
  } else {
    followedBy.following.push(followedTo._id);
    followedTo.followers.push(followedBy._id);
  }

  await followedBy.save();
  await followedTo.save();

  return res.json(new apiResponse(200, followedBy));
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const existUser = await User.findOne({ username });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(253402300000000),
  };

  if (existUser) {
    const correctPassword = unhashPassword(password, existUser.password);
    if (!correctPassword) {
      return next(new apiError(400, "Credentials are not correct"));
    }
    const acessToken = createAcessToken(existUser._id);
    return res
      .status(200)
      .cookie("acess_token", acessToken, options)
      .json(new apiResponse(200, removePassword(existUser._doc)));
  } else if (!existUser) {
    return next(new apiError(400, "no such user is there"));
  }
});

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, fullname, password } = req.body;

  const existUser = await User.findOne({ username });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(253402300000000),
  };

  if (existUser) {
    return next(new apiError(400, "user already exists"));
  } else if (!existUser) {
    const hashedPassword = hashPassword(password);

    const newUser = new User({
      fullname: fullname,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    const acessToken = createAcessToken(newUser._id);

    return res
      .status(200)
      .cookie("acess_token", acessToken, options)
      .json(new apiResponse(200, removePassword(newUser._doc)));
  }
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.params.id != req.user.id) {
    return next(new apiError(400, "you is not authorized"));
  }

  const existUser = await User.findOne({ username: req.body.username });

  if (existUser._id != req.params.id) {
    return next(new apiError(400, "username alredy taken"));
  }

  // const updatedUser = await User.findByIdAndUpdate(req.params.id)
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        fullname: req.body.fullname,
        username: req.body.username,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  ).select("-password");

  return res.json(new apiResponse(200, updatedUser));
});

export const feedProfiles = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");

  if (!users) {
    return next(new apiError(400, "no users here"));
  }

  const randomUsers = users.sort(() => Math.random() - 0.5);

  return res.json(new apiResponse(200, randomUsers.slice(0, 5)));
});

export const searchUser = asyncHandler(async (req, res, next) => {
  const keyword = req.query.search && {
    $or: [
      { fullname: { $regex: req.query.search, $options: "i" } },
      { username: { $regex: req.query.search, $options: "i" } },
    ],
  };

  if (!keyword) {
    return next(new apiError(400, "no user is search"));
  }

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");

  return res.json(new apiResponse(200, users));
});
