import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    isreply: { type: Boolean },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
