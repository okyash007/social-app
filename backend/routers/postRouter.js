import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getFollowingPosts,
  getPostById,
  likePost,
} from "../controllers/postController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const postRouter = Router();

postRouter.route("/create").post(verifyUser, createPost);
postRouter.route("/details/:id").get(getPostById);
postRouter.route("/all").get(getAllPosts);
postRouter.route("/following/:uid").get(verifyUser, getFollowingPosts);
postRouter.route("/like/:id").post(verifyUser, likePost);
