import { Router } from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { allMessages, sendMessage } from "../controllers/messageController.js";

export const messageRouter = Router();

// postRouter.route("/create").post(verifyUser, createPost);
// postRouter.route("/details/:id").get(getPostById);
// postRouter.route("/like/:id").post(verifyUser, likePost);

messageRouter.route("/send").post(verifyUser, sendMessage);
messageRouter.route("/:chatId").get(verifyUser, allMessages);
