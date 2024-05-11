import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  addComment,
  getComments,
  getReplies,
  replyToComment,
} from "../controllers/commentController.js";

export const commentRouter = Router();

// postRouter.route("/create").post(verifyUser, createPost);
// postRouter.route("/details/:id").get(getPostById);
// postRouter.route("/like/:id").post(verifyUser, likePost);

commentRouter.route("/send").post(verifyUser, addComment);
commentRouter.route("/:postid").get(verifyUser, getComments);
commentRouter.route("/replies/:commentid").get(verifyUser, getReplies);
commentRouter.route("/reply").post(verifyUser, replyToComment);

