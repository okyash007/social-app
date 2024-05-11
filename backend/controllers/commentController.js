import { Comment } from "../modles/commentModel.js";
import Post from "../modles/postModel.js";
import User from "../modles/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addComment = asyncHandler(async (req, res, next) => {
  const { uid, postid, content } = req.body;

  if (!uid && !postid && !content) {
    return next(new apiError(400, "all credentials are not there"));
  }

  if (req.user.id != uid) {
    return next(new apiError(400, "you are not authorized"));
  }

  const newComment = new Comment({
    user: uid,
    post: postid,
    content: content,
    isreply: false,
  });

  await newComment.save();

  const thatPost = await Post.findById(postid);

  thatPost.comments.push(newComment._id);

  await thatPost.save();

  const user = await User.findById(uid).select("-password");

  user.comments.push(newComment._id);

  user.save();

  return res.json(new apiResponse(200, user));
});

export const getComments = asyncHandler(async (req, res, next) => {
  //   const { postid } = req.body;

  let comments = await Comment.find({
    post: req.params.postid,
    isreply: false,
  }).populate("user replies");

  comments = await User.populate(comments, {
    path: "user",
    select: "-password",
  });

  comments = await User.populate(comments, {
    path: "replies.user",
    select: "-password",
  });

  return res.json(new apiResponse(200, comments));
});

export const replyToComment = asyncHandler(async (req, res, next) => {
  const { uid, postid, content, commentid } = req.body;

  if (req.user.id != uid) {
    return next(new apiError(400, "you are not authorized"));
  }

  const comment = await Comment.findById(commentid);

  if (!comment) {
    return next(new apiError(400, "no such comment is there"));
  }

  const newComment = new Comment({
    user: uid,
    post: postid,
    content: content,
    isreply: true,
  });

  await newComment.save();

  comment.replies.push(newComment._id);

  await comment.save();

  const user = await User.findById(uid).select("-password");

  user.comments.push(newComment._id);

  await user.save();

  return res.json(new apiResponse(200, user));
});

export const getReplies = asyncHandler(async (req, res, next) => {
  if (!req.params.commentid) {
    return next(new apiError(400, "there is no comment id"));
  }

  let comment = await Comment.findById(req.params.commentid).populate(
    "replies"
  );

  // console.log(comment);

  if (!comment) {
    return next(new apiError(400, "there is no such comment"));
  }

  comment = await User.populate(comment, {
    path: "replies.user",
    select: "-password",
  });

  return res.json(new apiResponse(200, comment.replies));
});
