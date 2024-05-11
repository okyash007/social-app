import { Router } from "express";
import {
  feedProfiles,
  follow,
  getProfile,
  searchUser,
  signIn,
  signUp,
  startUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const userRouter = Router();

userRouter.route("/start").post(startUser);
userRouter.route("/signin").post(signIn);
userRouter.route("/signUp").post(signUp);
userRouter.route("/profile/:username").get(getProfile);
userRouter.route("/feedprofile").get(feedProfiles);
userRouter.route("/search").get(verifyUser, searchUser);
userRouter.route("/follow/:username").post(verifyUser, follow);
userRouter.route("/update/:id").post(verifyUser, updateUser);
