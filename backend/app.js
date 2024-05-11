import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routers/userRouter.js";
import { errorMiddleWare } from "./middleWares/errorMiddleWare.js";
import { postRouter } from "./routers/postRouter.js";
import { chatRouter } from "./routers/chatRouter.js";
import { messageRouter } from "./routers/messageRouter.js";
import { commentRouter } from "./routers/commentRoute.js";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://gitsta-frontend.vercel.app"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcone to my server" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/comment", commentRouter);

app.use(errorMiddleWare);
