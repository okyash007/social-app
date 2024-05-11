import { Router } from "express";
import { acessChat, fetchChats } from "../controllers/chatController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const chatRouter = Router();

// postRouter.route("/create").post(verifyUser, createPost);
// postRouter.route("/details/:id").get(getPostById);
// postRouter.route("/like/:id").post(verifyUser, likePost);

chatRouter.route("/acess").post(verifyUser, acessChat);
chatRouter.route("/:id").get(verifyUser, fetchChats);
