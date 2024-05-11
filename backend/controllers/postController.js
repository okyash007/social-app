import Post from "../modles/postModel.js";
import User from "../modles/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPost = asyncHandler(async (req, res, next) => {
  //   const {} = req.body;
  //   return res.json(
  //     new apiResponse(200, { message: `your is is ${req.user.id}` })
  //   );

  const { text, image, uid } = req.body;

  if (!text || !image || !uid) {
    return next(new apiError(400, "all credentials are not there"));
  }

  if (req.user.id !== uid) {
    return next(new apiError(400, "you can create a post by your id only"));
  }

  const newPost = new Post({
    text,
    image,
    user: uid,
  });

  await newPost.save();

  const createdBy = await User.findById(uid);

  if (!createdBy) {
    return next(new apiError(400, "we cant find a used ny id u gave"));
  }
  createdBy.posts.push(newPost._id);

  await createdBy.save();

  return res.json(new apiResponse(200, newPost));
});

export const getPostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new apiError(400, "no such post is there"));
  }

  return res.json(new apiResponse(200, post));
});

export const likePost = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.body.uid) {
    return next(new apiError(400, "you are not authorized"));
  }

  const user = await User.findById(req.body.uid);
  const post = await Post.findById(req.params.id);

  if (!user) {
    return next(new apiError(400, "no such user is there"));
  }
  if (!post) {
    return next(new apiError(400, "no such post is there"));
  }

  const isLiked =
    post.likes.includes(user._id) || user.likes.includes(post._id);

  if (isLiked) {
    post.likes.pull(user._id);
    user.likes.pull(post._id);
  } else {
    post.likes.push(user._id);
    user.likes.push(post._id);
  }

  await post.save();
  await user.save();

  return res.json(new apiResponse(200, user));
});

export const getAllPosts = asyncHandler(async (req, res, next) => {
  let posts = await Post.find().populate("user");

  posts = await User.populate(posts, {
    path: "user",
    select: "avatar username fullname",
  });

  if (!posts) {
    return next(new apiError(400, "something went wrong"));
  }

  return res.json(new apiResponse(200, posts));
});

export const getFollowingPosts = asyncHandler(async (req, res, next) => {
  if (req.user.id != req.params.uid) {
    return next(new apiError(400, "you are not authorized"));
  }

  const user = await User.findById(req.params.uid);

  const following = user.following;

  let posts = await Post.find({ user: { $in: following } });

  posts = await User.populate(posts, {
    path: "user",
    select: "avatar username fullname",
  });

  if (!posts) {
    return next(new apiError(400, "something went wrong"));
  }

  return res.json(new apiResponse(200, posts));
});
