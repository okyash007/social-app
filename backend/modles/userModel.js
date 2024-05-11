import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-z0-9_-]+$/,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
